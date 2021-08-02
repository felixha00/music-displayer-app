import ActionTypes from '../actionTypes';
import store from '../store';

export const clearQueue = () => {
  const { queue, priorityQueue } = store.getState().player;

  store.dispatch({ type: ActionTypes.PLAYER_CLEAR_QUEUE });
};

export const getCombinedQueue = () => {
  const { queue, priorityQueue } = store.getState().player;
  return priorityQueue.concat(queue);
};
