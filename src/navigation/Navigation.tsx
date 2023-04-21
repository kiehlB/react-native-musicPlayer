import {TabActions} from '@react-navigation/native';
import {SCREENS} from '../lib/routes';
import {TrackCardProps} from '../types/trackCard.types';
import {justPlay} from '../services/playerActions';

type NavigationProps = {
  navigate: (screen: any, props?: any) => void;
  dispatch: (action: any) => void;
};

export type DetailPageProps = {
  id: string;
  name: string;
  image: string;
  citation?: string;
};

export const navigateToArtistDetailPage =
  (navigation: NavigationProps, props: DetailPageProps) => () => {
    navigation.navigate(SCREENS.ARTIST_SCREEN, props);
  };

export const navigateToAlbumDetailPage =
  (navigation: NavigationProps, props: DetailPageProps) => () => {
    navigation.navigate(SCREENS.ALBUM_SCREEN, props);
  };

export const navigateToTrackDetailPage =
  (navigation: NavigationProps) => (track: TrackCardProps) => {
    justPlay(track);
    navigation.dispatch(TabActions.jumpTo(SCREENS.PLAYER));
  };

export const navigateToPlayer = (navigation: NavigationProps) => () => {
  navigation.dispatch(TabActions.jumpTo(SCREENS.PLAYER));
};

export const navigateToPlaylistDetailPage =
  (navigation: NavigationProps, props: DetailPageProps) => () => {
    navigation.navigate(SCREENS.PLAYLIST_SCREEN, props);
  };

export const navigateToHomePage = (navigation: NavigationProps) => () => {
  navigation.navigate(SCREENS.HOME);
};
