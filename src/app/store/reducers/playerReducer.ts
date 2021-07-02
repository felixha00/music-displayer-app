import { PaletteColors } from 'react-palette';
import { Action, ISong } from '../../../utils/types';
import ActionTypes from '../actionTypes';

export type PlayerState = {
  current: ISong;
  palette: PaletteColors;
  playing: boolean;
};

const initialState: PlayerState = {
  current: {
    title: '',
    artist: '',
    album: '',
    length: 0,
    image: '',
  },
  palette: {},
  playing: false,
};

export default (state = initialState, action: Action): PlayerState => {
  switch (action.type) {
    case ActionTypes.PLAYER_SET_SONG: {
      return {
        ...state,
        current: action.payload,
      };
    }
    case ActionTypes.PLAYER_SET_COLOR_PALETTE: {
      return {
        ...state,
        palette: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
