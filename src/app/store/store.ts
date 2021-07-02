import { configureStore, combineReducers } from '@reduxjs/toolkit';
import playerReducer from './reducers/playerReducer';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
