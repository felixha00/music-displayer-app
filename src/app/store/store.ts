import {
  configureStore,
  combineReducers,
  applyMiddleware,
  createStore,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import playerReducer from './reducers/playerReducer';
import settingsReducer from './reducers/settingsReducer';
import queueReducer from './reducers/queueReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  queue: queueReducer,
  player: playerReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
