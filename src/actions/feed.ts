import { Feed } from '../types/types';

export const ADD_FEED = 'ADD_FEED';
export const REMOVE_FEED = 'REMOVE_FEED';
export const REMOVE_ALL_FEEDS = 'REMOVE_ALL_FEEDS';

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

export type FeedActions =
  | AddFeedAction
  | RemoveFeedAction
  | RemoveAllFeedsAction;
