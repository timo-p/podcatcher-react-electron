import { map, prop } from 'ramda';
import {
  ADD_TO_REFRESH_QUEUE,
  RefreshActions,
  REMOVE_ALL_REFRESH_QUEUE_ITEMS,
  REMOVE_FROM_REFRESH_QUEUE,
  UPDATE_REFRESH_QUEUE_ITEM_STATUS,
} from '../actions';
import { Refresh, RefreshQueueItem } from './types';

const removeFromRefreshList = (
  removeFrom: RefreshQueueItem[],
  removeThese: RefreshQueueItem[]
) => {
  const urls = map(prop('url'), removeThese);
  return removeFrom.filter(({ url }) => !urls.includes(url));
};

export default function refresh(
  state: Refresh = {
    queue: [],
  },
  action: RefreshActions
) {
  switch (action.type) {
    case ADD_TO_REFRESH_QUEUE:
      return {
        ...state,
        queue: [
          ...state.queue,
          ...removeFromRefreshList(action.payload, state.queue),
        ],
      };

    case REMOVE_FROM_REFRESH_QUEUE:
      return {
        queue: state.queue.filter(({ url }) => action.payload !== url),
      };

    case UPDATE_REFRESH_QUEUE_ITEM_STATUS:
      return {
        queue: state.queue.map((item) =>
          item.url === action.payload.url ? action.payload : item
        ),
      };

    case REMOVE_ALL_REFRESH_QUEUE_ITEMS:
      return {
        ...state,
        queue: [],
      };

    default:
      return state;
  }
}
