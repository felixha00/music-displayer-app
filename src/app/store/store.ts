import {
  configureStore,
  combineReducers,
  applyMiddleware,
  createStore,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import audioReducer from './reducers/audioReducer';
import playerReducer from './reducers/playerReducer';
import settingsReducer from './reducers/settingsReducer';
import queueReducer from './reducers/queueReducer';

const rootReducer = combineReducers({
  queue: queueReducer,
  player: playerReducer,
  settings: settingsReducer,
  audio: audioReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// export const eStore = new Store();

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
