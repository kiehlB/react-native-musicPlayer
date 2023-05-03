import { createSlice } from '@reduxjs/toolkit';
import { Lyrics } from '../types/types';

export interface Song {
  id?: string;
  filename?: string | undefined;
  album?: string;
  artist?: string;
  genre?: string;
  isExcluded?: boolean;
  isFav?: boolean;
  lrcUri?: string;
  coverUri?: string;
  videoUri?: string;
  duration?: number;
  lyrics?: Lyrics;
  url: string;
}

export interface SongsState {
  songs: Song[];
}

const initialState: SongsState = {
  songs: [],
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs(state, { payload }) {
      state.songs = payload;
    },
  },
});

export const { setSongs } = songsSlice.actions;

export default songsSlice.reducer;
