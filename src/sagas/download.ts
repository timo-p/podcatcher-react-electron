import {
  call,
  Effect,
  fork,
  put,
  select,
  take,
  TakeEffect,
} from 'redux-saga/effects';
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
} from '../reducers/types';
import { ParsedFeed } from '../types/types';

const mockDownloader = (item: DownloadQueueItem) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};

function* processQueue(): Generator<Effect, void, string> {
  try {
    const [
      downloadState,
      settingsState,
    ] = ((yield select(
      ({ download: selectedDownload, settings }: PodcatcherStateType) => [
        selectedDownload,
        settings,
      ]
    )) as unknown) as [Download, Settings];
    if (downloadState.queue.length > 0) {
      const downloadQueueItem = downloadState.queue[0];
      yield put({
        type: UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS,
        payload: {
          ...downloadQueueItem,
          status: 'downloading',
        },
      });
      const updatedFeed = ((yield call(
        mockDownloader,
        downloadQueueItem
      )) as unknown) as ParsedFeed;

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
