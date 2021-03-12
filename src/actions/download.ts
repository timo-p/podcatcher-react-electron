import { DownloadQueueItem } from '../reducers/types';

export const ADD_TO_DOWNLOAD_QUEUE = 'ADD_TO_DOWNLOAD_QUEUE';
export const REMOVE_FROM_DOWNLOAD_QUEUE = 'REMOVE_FROM_DOWNLOAD_QUEUE';
export const PROCESS_DOWNLOAD_QUEUE = 'PROCESS_DOWNLOAD_QUEUE';
export const UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS =
  'UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS';

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

export type DownloadActions =
  | AddToDownloadQueueAction
  | RemoveFromDownloadQueueAction
  | UpdateDownloadQueueItemStatus;
