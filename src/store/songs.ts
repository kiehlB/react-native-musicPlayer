import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import SettingsST from '../lib/SettingsST';
import { Lyrics } from '../lib/types';

export interface Song {
  id?: string;
  title?: string | undefined;
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
}

export interface SongsState {
  songs: Song[];
  songs2: any[];
}

const initialState: SongsState = {
  songs: [],
  songs2: [],
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs(state, { payload }) {
      payload.sort((s1: { title: string }, s2: { title: string }) =>
        s1.title.toLowerCase().localeCompare(s2.title.toLowerCase()),
      );
      SettingsST.getInstance().setSongs(payload);

      state.songs = payload;
    },
    setSong2(state, { payload }: PayloadAction<Song[]>) {
      state.songs2 = payload;
    },
  },
});

export const { setSongs, setSong2 } = songsSlice.actions;

export default songsSlice.reducer;
