import log from 'electron-log';
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
  REMOVE_FROM_DOWNLOAD_REMOVE_QUEUE,
  UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS,
} from '../actions';
import {
  Download,
  DownloadQueueItem,
  PodcatcherStateType,
  Settings,
  StateFeed,
} from '../reducers/types';

function* downloader(
  item: DownloadQueueItem,
  downloadDir: string,
  feedTitle: string
) {
  let updatedDownloadItem = {
    ...item,
    status: 'downloading',
  };
  let cancel = () => {};
  yield put({
    type: UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS,
    payload: updatedDownloadItem,
  });

  const downloadFunc = new Promise((resolve) => {
    log.info(`Starting download ${JSON.stringify(item)}`);
    const tempDir = path.join(downloadDir, 'incomplete_downloads');
    if (!fs.existsSync(tempDir)) {
      log.info(`Creating directory ${tempDir}`);
      fs.mkdirSync(tempDir);
    }
    const tmpFilename = path.join(tempDir, `${item.filenameOnDisk}.incomplete`);
    const feedDir = path.join(downloadDir, sanitize(feedTitle));
    const filename = path.join(feedDir, item.filenameOnDisk);
    const file = fs.createWriteStream(tmpFilename);
    file.on('close', () => {
      if (fs.existsSync(tmpFilename)) {
        if (!fs.existsSync(feedDir)) {
          log.info(`Creating directory ${feedDir}`);
          fs.mkdirSync(feedDir);
        }
        fs.renameSync(tmpFilename, filename);
        updatedDownloadItem = {
          ...updatedDownloadItem,
          status: 'finished',
          progress: 100,
          speed: 0,
        };
        resolve(true);
      }
    });
    let lastRefreshed: number;
    let chunkStarted = Date.now();
    const chunks: number[] = [];
    let downloaded = 0;
    const req = request.get(item.url);
    cancel = () => {
      req.abort();
      if (fs.existsSync(tmpFilename)) {
        fs.unlinkSync(tmpFilename);
      }
      updatedDownloadItem = { ...updatedDownloadItem, status: 'canceled' };
    };
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
        if (!lastRefreshed || lastRefreshed < Date.now() - 1000) {
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
      log.error(`Request error ${e}`);
    });
    req.pipe(file);
  });

  const task = ((yield fork(() => downloadFunc)) as unknown) as Task;
  while (task.isRunning()) {
    yield delay(1000);
    const removeQueue = ((yield select(
      ({ download: { removeQueue: stateRemoveQueue } }: PodcatcherStateType) =>
        stateRemoveQueue
    )) as unknown) as string[];

    if (removeQueue.includes(item.postId)) {
      cancel();
      task.cancel();
      yield put({
        type: REMOVE_FROM_DOWNLOAD_REMOVE_QUEUE,
        payload: item.postId,
      });
      yield put({
        type: UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS,
        payload: updatedDownloadItem,
      });
    }

    yield put({
      type: UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS,
      payload: updatedDownloadItem,
    });
  }
}

const getUnfinishedDownloadItemsFromQueue = (queue: DownloadQueueItem[]) =>
  queue.filter(({ status }) => status !== 'finished');

function* processQueue(): Generator<Effect, void, string> {
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
    const toDownload = getUnfinishedDownloadItemsFromQueue(downloadState.queue);
    if (toDownload.length > 0) {
      const downloadQueueItem = toDownload[0];
      const itemFeed = feedsState[downloadQueueItem.feedId];

      ((yield call(
        downloader,
        downloadQueueItem,
        settingsState.downloadDir,
        itemFeed.title
      )) as unknown) as Promise<boolean>;
    }
  } catch (e) {
    log.error(`Download queue processing failed ${e}`);
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
      ({ download: { queue } }: PodcatcherStateType) =>
        getUnfinishedDownloadItemsFromQueue(queue)
    );
    if (downloadQueue.length > 0) {
      yield call(processQueue);
      yield fork(startCheck);
    }
  }
}
