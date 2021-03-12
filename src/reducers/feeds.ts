import { omit } from 'ramda';
import {
  ADD_FEED,
  FeedActions,
  REMOVE_ALL_FEEDS,
  REMOVE_FEED,
} from '../actions';
import { StateFeed } from './types';

export default function feeds(state: StateFeed = {}, action: FeedActions) {
  switch (action.type) {
    case ADD_FEED:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case REMOVE_FEED:
      return omit([action.payload], state);
    case REMOVE_ALL_FEEDS:
      return {};
    default:
      return state;
  }
}
