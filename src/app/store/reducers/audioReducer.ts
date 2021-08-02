import { PaletteColors } from 'react-palette';
import { Action, ISong } from '../../../utils/types';
import ActionTypes from '../actionTypes';

export type AudioState = {
  bass: number;
};

const initialState: AudioState = {
  // current: {
  //   title: '',
  //   artist: '',
  //   album: '',
  //   length: 0,
  //   image: '',
  //   bpm: undefined,
  //   songPath: '',
  //   year: undefined,
  // },
  bass: 0,
};

export default (state = initialState, action: Action): AudioState => {
  switch (action.type) {
    case ActionTypes.AUDIO_SET_BASS: {
      return {
        ...state,
        bass: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
