import { combineReducers } from '@reduxjs/toolkit';
import audio from './audio';
import isLoading from './isLoading';
import songs from './songs';

const rootReducer = combineReducers({
  audio,
  isLoading,
  songs,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
