import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Audio } from 'expo-av';
import { PlayMode, PlayScope } from '../types/types';

export interface AudioState {
  isPlaying: boolean;
  playbackInstance: Audio.Sound | null;
  currentId: string;
  volume: number;
  isBuffering: boolean;
  playMode: PlayMode;
  playScope: PlayScope;
  scopeValue: string | undefined;
  currentPosition: number;
  isFav: boolean | undefined;
}

const initialState: AudioState = {
  isPlaying: false,
  playbackInstance: null,
  currentId: '',
  volume: 1.0,
  isBuffering: true,
  playMode: PlayMode.REPEAT,
  playScope: PlayScope.NONE,
  scopeValue: undefined,
  currentPosition: 0,
  isFav: undefined,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setCurrentId(state, { payload }: PayloadAction<string>) {
      state.currentId = payload;
    },
    setBuffering(state, { payload }: PayloadAction<boolean>) {
      state.isBuffering = payload;
    },
    setCurrentPosition(state, { payload }: PayloadAction<number>) {
      state.currentPosition = payload;
    },
    setPlaying(state, { payload }: PayloadAction<boolean>) {
      state.isPlaying = payload;
    },
    setPlaybackInstance(state, { payload }: PayloadAction<any>) {
      state.playbackInstance = payload;
    },
  },
});

export const {
  setCurrentId,
  setBuffering,
  setCurrentPosition,
  setPlaying,
  setPlaybackInstance,
} = audioSlice.actions;

export default audioSlice.reducer;
