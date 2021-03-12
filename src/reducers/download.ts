import { map, prop } from 'ramda';
import {
  ADD_TO_DOWNLOAD_QUEUE,
  DownloadActions,
  REMOVE_FROM_DOWNLOAD_QUEUE,
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
        queue: state.queue.filter(({ postId }) => action.payload !== postId),
      };

    case UPDATE_DOWNLOAD_QUEUE_ITEM_STATUS:
      return {
        queue: state.queue.map((item) =>
          item.postId === action.payload.postId ? action.payload : item
        ),
      };

    default:
      return state;
  }
}
