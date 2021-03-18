import { sub } from 'date-fns';
import log from 'electron-log';
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
  ADD_FEED,
  ADD_POSTS,
  PROCESS_REFRESH_QUEUE,
  REMOVE_FROM_REFRESH_QUEUE,
  UPDATE_REFRESH_QUEUE_ITEM_STATUS,
} from '../actions';
import {
  PodcatcherStateType,
  Refresh,
  RefreshQueueItem,
  Settings,
} from '../reducers/types';
import { ParsedFeed } from '../types/types';
import { fetchFeed } from '../utils/feeds';

function* fetchUser(): Generator<Effect, void, string> {
  const [
    refreshState,
    settingsState,
  ] = ((yield select(
    ({ refresh: selectedRefreshState, settings }: PodcatcherStateType) => [
      selectedRefreshState,
      settings,
    ]
  )) as unknown) as [Refresh, Settings];
  if (refreshState.queue.length > 0) {
    const refreshQueueItem = refreshState.queue[0];
    const ignoreOlderThan = sub(new Date(), {
      [settingsState.ignoreOlderThanUnit]: settingsState.ignoreOlderThan,
    });
    yield put({
      type: UPDATE_REFRESH_QUEUE_ITEM_STATUS,
      payload: {
        ...refreshQueueItem,
        status: 'processing',
      },
    });
    try {
      const updatedFeed = ((yield call(
        fetchFeed,
        refreshQueueItem.url,
        ignoreOlderThan
      )) as unknown) as ParsedFeed;

      yield put({
        type: ADD_POSTS,
        payload: updatedFeed.posts,
      });
      yield put({
        type: ADD_FEED,
        payload: {
          ...updatedFeed,
          posts: updatedFeed.posts.map((p) => p.id),
        },
      });
    } catch (e) {
      log.error(`Failed to fetch ${refreshQueueItem.url}. Error: ${e}`);
    } finally {
      yield put({
        type: REMOVE_FROM_REFRESH_QUEUE,
        payload: refreshQueueItem.url,
      });
    }
  }
}

function* startCheck() {
  yield put({
    type: PROCESS_REFRESH_QUEUE,
  });
}

export default function* refresh() {
  while (((yield take(PROCESS_REFRESH_QUEUE)) as unknown) as TakeEffect) {
    const refreshQueue: RefreshQueueItem[] = yield select(
      ({ refresh: { queue } }: PodcatcherStateType) => queue
    );
    if (refreshQueue.length > 0) {
      yield call(fetchUser);
      yield fork(startCheck);
    }
  }
}
