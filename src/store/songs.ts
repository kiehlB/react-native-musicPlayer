import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';
import {Lyrics} from '../types/types';
import SettingsST from '../lib/settingsST';

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
    setSongs(state, {payload}) {
      SettingsST.getInstance().setSongs(payload);

      console.log(payload);

      state.songs = payload;
    },
    setSong2(state, {payload}: PayloadAction<Song[]>) {
      state.songs2 = payload;
    },
  },
});

export const {setSongs, setSong2} = songsSlice.actions;

export default songsSlice.reducer;
