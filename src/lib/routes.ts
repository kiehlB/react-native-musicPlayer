import { ParamListBase, RouteProp } from '@react-navigation/native';

export enum SCREENS {
  HOME = 'Home',
  Folder = 'Folder',
  Settings = 'Settings',
  SEARCH_SCREEN = 'Search Screen',
  ARTIST_SCREEN = 'Artist Screen',
  ALBUM_SCREEN = 'Album Screen',
  PLAYLIST_SCREEN = 'Playlist Screen',
  Music = 'Music',
}

export type ScreenPropsType = {
  route: RouteProp<ParamListBase, SCREENS>;
  navigation: any;
};
