import { ParamListBase, RouteProp } from '@react-navigation/native';

export enum SCREENS {
  HOME = 'Home',
  SEARCH = 'Search',
  PLAYER = 'Player',
  SEARCH_SCREEN = 'Search Screen',
  ARTIST_SCREEN = 'Artist Screen',
  ALBUM_SCREEN = 'Album Screen',
  PLAYLIST_SCREEN = 'Playlist Screen',
  ROOT = 'root',
}

export type ScreenPropsType = {
  route: RouteProp<ParamListBase, SCREENS>;
  navigation: any;
};
