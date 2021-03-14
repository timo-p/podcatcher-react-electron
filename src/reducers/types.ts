import { Action, Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { Feed, Post } from '../types/types';

export type StateFeed = {
  [key: string]: Feed;
};

export type StatePost = {
  [key: string]: Post;
};

export type IgnoreOlderThanUnit = 'days' | 'weeks' | 'months' | 'years';

export type Settings = {
  downloadDir: string;
  ignoreOlderThan: number;
  ignoreOlderThanUnit: IgnoreOlderThanUnit;
};

export type RefreshQueueItemStatus = 'queued' | 'processing';

export type RefreshQueueItem = {
  title?: string;
  url: string;
  status: RefreshQueueItemStatus;
};

export type Refresh = {
  queue: RefreshQueueItem[];
};

export type DownloadQueueItemStatus =
  | 'queued'
  | 'downloading'
  | 'canceled'
  | 'finished';

export type DownloadQueueItem = {
  postId: string;
  feedId: string;
  url: string;
  title: string;
  filenameOnDisk: string;
  size: number;
  status: DownloadQueueItemStatus;
  progress: number;
  speed: number;
};

export type Download = {
  queue: DownloadQueueItem[];
};

export type PodcatcherStateType = {
  posts: StatePost;
  feeds: StateFeed;
  settings: Settings;
  refresh: Refresh;
  download: Download;
};

export type GetState = () => PodcatcherStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<PersistPartial, Action<string>>;
