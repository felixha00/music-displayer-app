import { Action } from '../../../utils/types';
import ActionTypes from '../actionTypes';

export type QueueState = {
  queue: Array<string>;
  priorityQueue: Array<string>;
};

const initialState: QueueState = {
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
  queue: [],
  priorityQueue: [],
};

export default (state = initialState, action: Action): QueueState => {
  switch (action.type) {
    case ActionTypes.PLAYER_CLEAR_QUEUE: {
      return {
        ...state,
        queue: [],
        priorityQueue: [],
      };
    }
    default: {
      return state;
    }
  }
};
