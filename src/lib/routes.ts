import { ParamListBase, RouteProp } from '@react-navigation/native';

export enum SCREENS {
  HOME = 'Home',
  FOLDER = 'Folder',
  SETTINGS = 'Settings',
  SEARCH_SCREEN = 'Search Screen',
  ARTIST_SCREEN = 'Artist Screen',
  ALBUM_SCREEN = 'Album Screen',
  PLAYLIST_SCREEN = 'Playlist Screen',
  MUSIC = 'Music',
  SEARCH = 'Search',
}

export type ScreenPropsType = {
  route: RouteProp<ParamListBase, SCREENS>;
  navigation: any;
};
