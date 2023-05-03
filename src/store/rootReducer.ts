import { combineReducers } from '@reduxjs/toolkit';
import audio from './audio';
import isLoading from './isLoading';
import songs from './songs';
import playList from './playList';
import store from './store';

const rootReducer = combineReducers({
  audio,
  isLoading,
  songs,
  playList,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
