import { RefreshQueueItem, Settings } from '../reducers/types';
import { Feed, Post } from '../types/types';

export const ADD_FEED = 'ADD_FEED';
export const REMOVE_FEED = 'REMOVE_FEED';
export const REMOVE_ALL_FEEDS = 'REMOVE_ALL_FEEDS';
export const ADD_POSTS = 'ADD_POSTS';
export const MARK_POSTS_READ = 'MARK_POSTS_READ';
export const MARK_ALL_POSTS_READ = 'MARK_ALL_POSTS_READ';
export const SET_POST_IS_READ = 'SET_POST_IS_READ';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const REMOVE_POSTS = 'REMOVE_POSTS';
export const REMOVE_ALL_POSTS = 'REMOVE_ALL_POSTS';
export const ADD_TO_REFRESH_QUEUE = 'ADD_TO_REFRESH_QUEUE';
export const REMOVE_FROM_REFRESH_QUEUE = 'REMOVE_FROM_REFRESH_QUEUE';
export const PROCESS_REFRESH_QUEUE = 'PROCESS_REFRESH_QUEUE';
export const UPDATE_REFRESH_QUEUE_ITEM_STATUS =
  'UPDATE_REFRESH_QUEUE_ITEM_STATUS';

export interface AddFeedAction {
  type: typeof ADD_FEED;
  payload: Feed;
}

export function addFeed(feed: Feed): AddFeedAction {
  return {
    type: ADD_FEED,
    payload: feed,
  };
}

export interface AddPostsAction {
  type: typeof ADD_POSTS;
  payload: Post[];
}

export function addPosts(posts: Post[]): AddPostsAction {
  return {
    type: ADD_POSTS,
    payload: posts,
  };
}

export interface RemoveFeedAction {
  type: typeof REMOVE_FEED;
  payload: Feed['id'];
}

export function removeFeed(id: Feed['id']): RemoveFeedAction {
  return {
    type: REMOVE_FEED,
    payload: id,
  };
}

export interface RemoveAllFeedsAction {
  type: typeof REMOVE_ALL_FEEDS;
}

export function removeAllFeeds(): RemoveAllFeedsAction {
  return {
    type: REMOVE_ALL_FEEDS,
  };
}

export interface RemovePostsAction {
  type: typeof REMOVE_POSTS;
  payload: Post['id'][];
}

export function removePosts(ids: Post['id'][]): RemovePostsAction {
  return {
    type: REMOVE_POSTS,
    payload: ids,
  };
}

export interface RemoveAllPostsAction {
  type: typeof REMOVE_ALL_POSTS;
}

export function removeAllPosts(): RemoveAllPostsAction {
  return {
    type: REMOVE_ALL_POSTS,
  };
}

export interface SetPostIsReadAction {
  type: typeof SET_POST_IS_READ;
  payload: {
    postId: Post['id'];
    isRead: boolean;
  };
}

export function setPostIsRead(
  postId: Post['id'],
  isRead: boolean
): SetPostIsReadAction {
  return {
    type: SET_POST_IS_READ,
    payload: {
      postId,
      isRead,
    },
  };
}

export interface MarkPostsReadAction {
  type: typeof MARK_POSTS_READ;
  payload: Post['id'][];
}

export function markPostsRead(postIds: Post['id'][]): MarkPostsReadAction {
  return {
    type: MARK_POSTS_READ,
    payload: postIds,
  };
}

export interface MarkAllPostsReadAction {
  type: typeof MARK_ALL_POSTS_READ;
}

export function markAllPostsRead(): MarkAllPostsReadAction {
  return {
    type: MARK_ALL_POSTS_READ,
  };
}

export interface SaveSettingsAction {
  type: typeof SAVE_SETTINGS;
  payload: Settings;
}

export function saveSettings(settings: Settings): SaveSettingsAction {
  return {
    type: SAVE_SETTINGS,
    payload: settings,
  };
}

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

export type FeedActions =
  | AddFeedAction
  | RemoveFeedAction
  | RemoveAllFeedsAction;
export type PostActions =
  | AddPostsAction
  | RemovePostsAction
  | RemoveAllPostsAction
  | SetPostIsReadAction
  | MarkPostsReadAction
  | MarkAllPostsReadAction;
export type SettingsActions = SaveSettingsAction;
export type RefreshActions =
  | AddToRefreshQueueAction
  | RemoveFromRefreshQueueAction
  | UpdateRefreshQueueItemStatus;
