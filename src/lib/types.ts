export interface Album {
  name: string;
  songAmount: number;
  subAlbums: number;
  artists: string[];
}

export interface Artist {
  name: string;
}

export interface Genre {
  name: string;
}

export default interface LyricsLine {
  time: number | null;
  text: string;
  key: string;
}

export type Lyrics = LyricsLine[];

export enum PlayMode {
  REPEAT = 'REPEAT',
  REPEAT_SONG = 'REPEAT_SONG',
  SHUFFLE = 'SHUFFLE',
}

export enum PlayScope {
  NONE = 'NONE',
  ALBUM = 'ALBUM',
  ARTIST = 'ARTIST',
  GENRE = 'GENRE',
}
