import { PaletteColors } from 'react-palette';
import { Action, ISong } from '../../../utils/types';
import ActionTypes from '../actionTypes';
import _ from 'lodash';

export type PlayerState = {
  current: ISong | null;
  next: ISong | null;
  palette: PaletteColors;
  playing: boolean;
  queue: Array<string>;
  priorityQueue: Array<string>;
  songStack: Array<string>;
  songIndex: number;
  currentTime: number;
  vol: number;
  loading: Array<string>;
  shuffle: boolean;
  modal: boolean;
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
  priorityQueue: [],
  songStack: [],
  songIndex: 0,
  currentTime: 0,
  vol: 0.2,
  loading: [],
  shuffle: true,
  modal: false,
};

export default (state = initialState, action: Action): PlayerState => {
  switch (action.type) {
    case ActionTypes.PLAYER_TOGGLE_MODAL: {
      return {
        ...state,
        modal: !state.modal,
      };
    }
    case ActionTypes.PLAYER_SET_SONG: {
      return {
        ...state,
        current: {...action.payload, id: _.uniqueId()},
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
    case ActionTypes.PLAYER_CLEAR_QUEUE: {
      return {
        ...state,
        queue: [],
        priorityQueue: [],
      };
    }
    case ActionTypes.PLAYER_APPEND_TO_QUEUE: {
      const { priority, path } = action.payload;
      if (!priority) {
        return {
          ...state,
          queue: [...state.queue, path],
        };
      }
      return {
        ...state,
        priorityQueue: [...state.priorityQueue, path],
      };
      // if (!state.queue.length) {
      //   return {
      //     ...state,
      //     queue: [action.payload] || state.queue,
      //     songIndex: 0,
      //   };
      // }
      // const newArr = state.queue;
      // newArr.splice(1, 0, action.payload);
      // return {
      //   ...state,
      //   queue: newArr,
      // };
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
      if (state.priorityQueue.length) {
        const newQueue = [...state.priorityQueue];
        newQueue.shift();
        return {
          ...state,
          songStack: [...state.songStack, state.priorityQueue[0]],
          priorityQueue: newQueue,
        };
      }
      const newQueue = [...state.queue];
      newQueue.shift();
      return {
        ...state,
        songIndex: state.songIndex + 1,
        songStack: [...state.songStack, state.queue[0]],
        queue: newQueue,
      };
    }
    case ActionTypes.PLAYER_PREV_INDEX: {
      const newSongStack = [...state.songStack];
      newSongStack.pop();
      return {
        ...state,
        songIndex: state.songIndex - 1,
        songStack: newSongStack,
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
