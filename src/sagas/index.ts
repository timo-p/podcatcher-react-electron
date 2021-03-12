import { all } from 'redux-saga/effects';
import download from './download';
import refresh from './refresh';

export default function* rootSaga() {
  yield all([refresh(), download()]);
}
