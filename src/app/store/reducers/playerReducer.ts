import { PaletteColors } from 'react-palette';
import { Action, ISong } from '../../../utils/types';
import ActionTypes from '../actionTypes';

export type PlayerState = {
  current: ISong;
  next: ISong | null;
  palette: PaletteColors;
  playing: boolean;
  queue: Array<string>;
  songIndex: number;
  currentTime: number;
  vol: number;
  loading: boolean;
};

const initialState: PlayerState = {
  current: {
    title: '',
    artist: '',
    album: '',
    length: 0,
    image: '',
    bpm: undefined,
    songPath: '',
    year: undefined,
  },
  next: null,
  palette: {},
  playing: true,
  queue: [],
  songIndex: 0,
  currentTime: 0,
  vol: 0.2,
  loading: false,
  shuffle: true,
};

export default (state = initialState, action: Action): PlayerState => {
  switch (action.type) {
    case ActionTypes.PLAYER_SET_SONG: {
      return {
        ...state,
        current: action.payload,
        currentTime: 0,
      };
    }
    case ActionTypes.PLAYER_SET_NEXT_SONG: {
      return {
        ...state,
        next: action.payload,
      };
    }
    case ActionTypes.PLAYER_SET_COLOR_PALETTE: {
      return {
        ...state,
        palette: action.payload,
      };
    }
    case ActionTypes.PLAYER_SET_QUEUE: {
      return {
        ...state,
        queue: action.payload || [],
      };
    }
    case ActionTypes.PLAYER_SET_PLAY: {
      return {
        ...state,
        playing: true,
      };
    }
    case ActionTypes.PLAYER_SET_PAUSE: {
      return {
        ...state,
        playing: false,
      };
    }
    case ActionTypes.PLAYER_SET_VOLUME: {
      return {
        ...state,
        vol: action.payload,
      };
    }

    case ActionTypes.PLAYER_SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case ActionTypes.PLAYER_SET_LOADING_DONE: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
