import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import posts from './posts';
import feeds from './feeds';
import settings from './settings';
import refresh from './refresh';
import download from './download';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    posts,
    feeds,
    settings,
    refresh,
    download,
  });
}
