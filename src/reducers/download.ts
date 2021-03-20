import { map, prop, without } from 'ramda';
import {
  ADD_TO_DOWNLOAD_QUEUE,
  ADD_TO_DOWNLOAD_REMOVE_QUEUE,
  DownloadActions,
  REMOVE_ALL_DOWNLOAD_QUEUE_ITEMS,
  REMOVE_ALL_DOWNLOAD_REMOVE_QUEUE_ITEMS,
  REMOVE_FROM_DOWNLOAD_QUEUE,
  REMOVE_FROM_DOWNLOAD_REMOVE_QUEUE,
  UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS,
} from '../actions';
import { Download, DownloadQueueItem } from './types';

const removeFromDownloadList = (
  removeFrom: DownloadQueueItem[],
  removeThese: DownloadQueueItem[]
) => {
  const urls = map(prop('url'), removeThese);
  return removeFrom.filter(({ url }) => !urls.includes(url));
};

export default function download(
  state: Download = {
    queue: [],
    removeQueue: [],
  },
  action: DownloadActions
) {
  switch (action.type) {
    case ADD_TO_DOWNLOAD_QUEUE:
      return {
        ...state,
        queue: [
          ...state.queue,
          ...removeFromDownloadList(action.payload, state.queue),
        ],
      };

    case REMOVE_FROM_DOWNLOAD_QUEUE:
      return {
        ...state,
        queue: state.queue.filter(({ postId }) => action.payload !== postId),
      };

    case UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS:
      return {
        ...state,
        queue: state.queue.map((item) =>
          item.postId === action.payload.postId ? action.payload : item
        ),
      };

    case REMOVE_ALL_DOWNLOAD_QUEUE_ITEMS:
      return {
        ...state,
        queue: [],
      };
    case ADD_TO_DOWNLOAD_REMOVE_QUEUE:
      return {
        ...state,
        removeQueue: [...state.removeQueue, action.payload],
      };
    case REMOVE_FROM_DOWNLOAD_REMOVE_QUEUE:
      return {
        ...state,
        removeQueue: without([action.payload], state.removeQueue),
      };
    case REMOVE_ALL_DOWNLOAD_REMOVE_QUEUE_ITEMS:
      return {
        ...state,
        removeQueue: [],
      };

    default:
      return state;
  }
}
