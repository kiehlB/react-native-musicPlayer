import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Playlist {
  id: string;
  name: string;
  songs: string[];
}

interface AppState {
  playlists: Playlist[];
}

const initialState: AppState = {
  playlists: [],
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addSong(state, action: PayloadAction<{ playlistId: string; song: string }>) {
      const { playlistId, song } = action.payload;
      const playlistIndex = state.playlists.findIndex(
        playlist => playlist.id === playlistId,
      );
      if (playlistIndex !== -1) {
        state.playlists[playlistIndex].songs.push(song);
      }
    },
    removeSong(state, action: PayloadAction<{ playlistId: string; songId: string }>) {
      const { playlistId, songId } = action.payload;
      const playlistIndex = state.playlists.findIndex(
        playlist => playlist.id === playlistId,
      );
      if (playlistIndex !== -1) {
        state.playlists[playlistIndex].songs = state.playlists[
          playlistIndex
        ].songs.filter(song => song !== songId);
      }
    },
    createPlaylist(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;
      state.playlists.push({
        id,
        name,
        songs: [],
      });
    },
  },
});

export const { addSong, removeSong, createPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
