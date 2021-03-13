import fs from 'fs';
import path from 'path';
import { Task } from 'redux-saga';
import {
  call,
  delay,
  Effect,
  fork,
  put,
  select,
  take,
  TakeEffect,
} from 'redux-saga/effects';
import request from 'request';
import sanitize from 'sanitize-filename';
import {
  PROCESS_DOWNLOAD_QUEUE,
  REMOVE_FROM_DOWNLOAD_QUEUE,
  UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS,
} from '../actions';
import {
  Download,
  DownloadQueueItem,
  PodcatcherStateType,
  Settings,
  StateFeed,
} from '../reducers/types';

function* mockDownloader(
  item: DownloadQueueItem,
  downloadDir: string,
  feedTitle: string
) {
  let updatedDownloadItem = {
    ...item,
    status: 'downloading',
  };
  yield put({
    type: UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS,
    payload: updatedDownloadItem,
  });

  const asd = new Promise((resolve) => {
    console.log('Starting download', item);
    const tempDir = path.join(downloadDir, 'incomplete_downloads');
    if (!fs.existsSync(tempDir)) {
      console.log('Creating directory', tempDir);
      fs.mkdirSync(tempDir);
    }
    const tmpFilename = path.join(tempDir, `${item.file}.incomplete`);
    const feedDir = path.join(downloadDir, sanitize(feedTitle));
    const filename = path.join(feedDir, item.file);
    const file = fs.createWriteStream(tmpFilename);
    file.on('close', () => {
      if (fs.existsSync(tmpFilename)) {
        if (!fs.existsSync(feedDir)) {
          console.log('Creating directory', feedDir);
          fs.mkdirSync(feedDir);
        }
        fs.renameSync(tmpFilename, filename);
        updatedDownloadItem = { ...updatedDownloadItem, status: 'finished' };
        resolve(true);
      }
    });
    let lastRefreshed: number;
    let chunkStarted = Date.now();
    const chunks: number[] = [];
    let downloaded = 0;
    const req = request.get(item.url);
    req.on('response', (response) => {
      response.on('data', (chunk) => {
        downloaded += chunk.length;
        const chunkSpeed =
          chunk.length / 1024 / ((Date.now() - chunkStarted) / 1000);
        if (chunkSpeed !== Infinity) {
          chunks.push(chunkSpeed);
        }
        chunkStarted = Date.now();
        while (chunks.length > 100) {
          chunks.shift();
        }
        if (!lastRefreshed || lastRefreshed < Date.now() - 500) {
          const progress = (100.0 * downloaded) / item.size;
          const speed = chunks.reduce((s, c) => s + c, 0) / chunks.length;
          updatedDownloadItem = {
            ...updatedDownloadItem,
            progress,
            speed,
          };
          lastRefreshed = Date.now();
        }
      });
    });
    req.on('error', (e) => {
      console.log('Request error', e);
    });
    req.pipe(file);
  });

  console.log('BEFORE');
  const task = ((yield fork(() => asd)) as unknown) as Task;
  while (task.isRunning()) {
    yield delay(50);
    yield put({
      type: UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS,
      payload: updatedDownloadItem,
    });
  }
  console.log('AFTER');
}

function* processQueue(): Promise<Generator<Effect, void, string>> {
  try {
    const [
      downloadState,
      settingsState,
      feedsState,
    ] = ((yield select(
      ({
        download: selectedDownload,
        settings,
        feeds,
      }: PodcatcherStateType) => [selectedDownload, settings, feeds]
    )) as unknown) as [Download, Settings, StateFeed];
    if (downloadState.queue.length > 0) {
      const downloadQueueItem = downloadState.queue[0];
      const itemFeed = feedsState[downloadQueueItem.feedId];

      const updatedFeed = ((yield call(
        mockDownloader,
        downloadQueueItem,
        settingsState.downloadDir,
        itemFeed.title
      )) as unknown) as Promise<boolean>;

      yield put({
        type: REMOVE_FROM_DOWNLOAD_QUEUE,
        payload: downloadQueueItem.postId,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* startCheck() {
  yield put({
    type: PROCESS_DOWNLOAD_QUEUE,
  });
}

export default function* download() {
  while (((yield take(PROCESS_DOWNLOAD_QUEUE)) as unknown) as TakeEffect) {
    const downloadQueue: DownloadQueueItem[] = yield select(
      ({ download: { queue } }: PodcatcherStateType) => queue
    );
    if (downloadQueue.length > 0) {
      yield call(processQueue);
      yield fork(startCheck);
    }
  }
}
