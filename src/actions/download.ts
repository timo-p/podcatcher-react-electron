import { DownloadQueueItem } from '../reducers/types';

export const ADD_TO_DOWNLOAD_QUEUE = 'ADD_TO_DOWNLOAD_QUEUE';
export const REMOVE_FROM_DOWNLOAD_QUEUE = 'REMOVE_FROM_DOWNLOAD_QUEUE';
export const PROCESS_DOWNLOAD_QUEUE = 'PROCESS_DOWNLOAD_QUEUE';
export const UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS =
  'UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS';
export const REMOVE_ALL_DOWNLOAD_QUEUE_ITEMS =
  'REMOVE_ALL_DOWNLOAD_QUEUE_ITEMS';
export const ADD_TO_DOWNLOAD_REMOVE_QUEUE = 'ADD_TO_DOWNLOAD_REMOVE_QUEUE';
export const REMOVE_FROM_DOWNLOAD_REMOVE_QUEUE =
  'REMOVE_FROM_DOWNLOAD_REMOVE_QUEUE';
export const REMOVE_ALL_DOWNLOAD_REMOVE_QUEUE_ITEMS =
  'REMOVE_ALL_DOWNLOAD_REMOVE_QUEUE_ITEMS';

export interface AddToDownloadQueueAction {
  type: typeof ADD_TO_DOWNLOAD_QUEUE;
  payload: DownloadQueueItem[];
}

export function addToDownloadQueue(
  items: DownloadQueueItem[]
): AddToDownloadQueueAction {
  return {
    type: ADD_TO_DOWNLOAD_QUEUE,
    payload: items,
  };
}

export interface RemoveFromDownloadQueueAction {
  type: typeof REMOVE_FROM_DOWNLOAD_QUEUE;
  payload: string;
}

export function removeFromDownloadQueue(
  postId: string
): RemoveFromDownloadQueueAction {
  return {
    type: REMOVE_FROM_DOWNLOAD_QUEUE,
    payload: postId,
  };
}

export interface ProcessDownloadQueueAction {
  type: typeof PROCESS_DOWNLOAD_QUEUE;
}

export function processDownloadQueue(): ProcessDownloadQueueAction {
  return {
    type: PROCESS_DOWNLOAD_QUEUE,
  };
}

export interface UpdateDownloadQueueItemStatus {
  type: typeof UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS;
  payload: DownloadQueueItem;
}

export function updateDownloadQueueItem(
  item: DownloadQueueItem
): UpdateDownloadQueueItemStatus {
  return {
    type: UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS,
    payload: item,
  };
}

export interface RemoveAllDownloadQueueItems {
  type: typeof REMOVE_ALL_DOWNLOAD_QUEUE_ITEMS;
}

export function removeAllDownloadQueueItems(): RemoveAllDownloadQueueItems {
  return {
    type: REMOVE_ALL_DOWNLOAD_QUEUE_ITEMS,
  };
}

export interface AddToDownloadRemoveQueue {
  type: typeof ADD_TO_DOWNLOAD_REMOVE_QUEUE;
  payload: string;
}

export function addToDownloadRemoveQueue(
  postId: string
): AddToDownloadRemoveQueue {
  return {
    type: ADD_TO_DOWNLOAD_REMOVE_QUEUE,
    payload: postId,
  };
}

export interface RemoveFromDownloadRemoveQueue {
  type: typeof REMOVE_FROM_DOWNLOAD_REMOVE_QUEUE;
  payload: string;
}

export function removeFromDownloadRemoveQueue(
  postId: string
): RemoveFromDownloadRemoveQueue {
  return {
    type: REMOVE_FROM_DOWNLOAD_REMOVE_QUEUE,
    payload: postId,
  };
}

export interface RemoveAllDownloadRemoveQueueItems {
  type: typeof REMOVE_ALL_DOWNLOAD_REMOVE_QUEUE_ITEMS;
}

export function removeAllDownloadRemoveQueueItems(): RemoveAllDownloadRemoveQueueItems {
  return {
    type: REMOVE_ALL_DOWNLOAD_REMOVE_QUEUE_ITEMS,
  };
}

export type DownloadActions =
  | AddToDownloadQueueAction
  | RemoveFromDownloadQueueAction
  | UpdateDownloadQueueItemStatus
  | RemoveAllDownloadQueueItems
  | AddToDownloadRemoveQueue
  | RemoveFromDownloadRemoveQueue
  | RemoveAllDownloadRemoveQueueItems;
