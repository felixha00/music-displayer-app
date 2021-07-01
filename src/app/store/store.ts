import { configureStore, combineReducers } from '@reduxjs/toolkit';
import playerReducer from './reducers/playerReducer';

const rootReducer = combineReducers({
  player: playerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
