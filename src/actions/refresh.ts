import { RefreshQueueItem } from '../reducers/types';

export const ADD_TO_REFRESH_QUEUE = 'ADD_TO_REFRESH_QUEUE';
export const REMOVE_FROM_REFRESH_QUEUE = 'REMOVE_FROM_REFRESH_QUEUE';
export const PROCESS_REFRESH_QUEUE = 'PROCESS_REFRESH_QUEUE';
export const UPDATE_REFRESH_QUEUE_ITEM_STATUS =
  'UPDATE_REFRESH_QUEUE_ITEM_STATUS';
export const REMOVE_ALL_REFRESH_QUEUE_ITEMS = 'REMOVE_ALL_REFRESH_QUEUE_ITEMS';

export interface AddToRefreshQueueAction {
  type: typeof ADD_TO_REFRESH_QUEUE;
  payload: RefreshQueueItem[];
}

export function addToRefreshQueue(
  items: RefreshQueueItem[]
): AddToRefreshQueueAction {
  return {
    type: ADD_TO_REFRESH_QUEUE,
    payload: items,
  };
}

export interface RemoveFromRefreshQueueAction {
  type: typeof REMOVE_FROM_REFRESH_QUEUE;
  payload: string;
}

export function removeFromRefreshQueue(
  url: string
): RemoveFromRefreshQueueAction {
  return {
    type: REMOVE_FROM_REFRESH_QUEUE,
    payload: url,
  };
}

export interface ProcessRefreshQueueAction {
  type: typeof PROCESS_REFRESH_QUEUE;
}

export function processRefreshQueue(): ProcessRefreshQueueAction {
  return {
    type: PROCESS_REFRESH_QUEUE,
  };
}

export interface UpdateRefreshQueueItemStatus {
  type: typeof UPDATE_REFRESH_QUEUE_ITEM_STATUS;
  payload: RefreshQueueItem;
}

export function updateRefreshQueueItem(
  item: RefreshQueueItem
): UpdateRefreshQueueItemStatus {
  return {
    type: UPDATE_REFRESH_QUEUE_ITEM_STATUS,
    payload: item,
  };
}

export interface RemoveAllRefreshQueueItems {
  type: typeof REMOVE_ALL_REFRESH_QUEUE_ITEMS;
}

export function removeAllRefreshQueueItems(): RemoveAllRefreshQueueItems {
  return {
    type: REMOVE_ALL_REFRESH_QUEUE_ITEMS,
  };
}

export type RefreshActions =
  | AddToRefreshQueueAction
  | RemoveFromRefreshQueueAction
  | UpdateRefreshQueueItemStatus
  | RemoveAllRefreshQueueItems;
