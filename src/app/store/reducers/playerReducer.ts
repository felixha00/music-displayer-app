import { PaletteColors } from 'react-palette';
import { Action, ISong } from '../../../utils/types';
import ActionTypes from '../actionTypes';

export type PlayerState = {
  current: ISong | null;
  next: ISong | null;
  palette: PaletteColors;
  playing: boolean;
  queue: Array<string>;
  songIndex: number;
  currentTime: number;
  vol: number;
  loading: Array<string>;
  shuffle: true;
};

const initialState: PlayerState = {
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
  current: null,
  next: null,
  palette: {},
  playing: false,
  queue: [],
  songIndex: 0,
  currentTime: 0,
  vol: 0.2,
  loading: [],
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
        songIndex: 0,
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
    case ActionTypes.PLAYER_NEXT_INDEX: {
      return {
        ...state,
        songIndex: state.songIndex + 1,
      };
    }
    case ActionTypes.PLAYER_PREV_INDEX: {
      return {
        ...state,
        songIndex: state.songIndex - 1,
      };
    }
    case ActionTypes.PLAYER_SET_LOADING: {
      return {
        ...state,
        loading: [...state.loading, action.payload],
      };
    }
    case ActionTypes.PLAYER_SET_LOADING_DONE: {
      const newLoadingState = state.loading.filter((key) => {
        return key !== action.payload;
      });
      return {
        ...state,
        loading: newLoadingState,
      };
    }
    case ActionTypes.PLAYER_SET_TIME: {
      return {
        ...state,
        currentTime: action.payload,
      };
    }
    case ActionTypes.PLAYER_SET_INDEX: {
      return {
        ...state,
        songIndex: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
