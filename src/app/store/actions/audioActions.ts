import ActionTypes from '../actionTypes';
import store from '../store';

export const setBass = (bass: number) => {
  store.dispatch({
    type: ActionTypes.AUDIO_SET_BASS,
    payload: bass,
  });
};

export default {};
