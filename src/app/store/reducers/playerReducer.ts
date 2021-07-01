import { Action, ISong } from '../../../utils/types';
import ActionTypes from '../actionTypes';

export type PlayerState = {
  current: ISong;
};

const initialState: PlayerState = {
  current: {
    title: '',
    artist: '',
    album: '',
    length: 0,
    image: '',
  },
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.PLAYER_SET_SONG: {
      return {
        ...state,
        current: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
