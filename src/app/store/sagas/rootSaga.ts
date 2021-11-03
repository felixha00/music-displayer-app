import { put, takeEvery, all } from 'redux-saga/effects';
import playerSaga from './playerSaga';

export default function* rootSaga() {
  yield all([...playerSaga]);
}
