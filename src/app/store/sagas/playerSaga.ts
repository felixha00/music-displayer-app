import { put, takeEvery, all, select } from 'redux-saga/effects';
import { ISong } from '../../../utils/types';
import ActionTypes from '../actionTypes';
import { RootState } from '../store';

function* onSetSong() {
  const playing: boolean = yield select(
    (state: RootState) => state.player.playing
  );

  if (!playing) {
    yield put({ type: ActionTypes.PLAYER_SET_PLAY });
  }
}

function* watchSetCurrentSong() {
  yield takeEvery([ActionTypes.PLAYER_SET_SONG], onSetSong);
}

function* onQueueChange() {
  const current: ISong = yield select(
    (state: RootState) => state.player.current
  );

  if (!current) {
  }
}

function* watchQueueChange() {
  yield takeEvery([ActionTypes.PLAYER_UPDATE_QUEUE], onQueueChange);
}

export default [watchSetCurrentSong()];
