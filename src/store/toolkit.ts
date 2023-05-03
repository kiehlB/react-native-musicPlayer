import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';
import { setSongs } from './songs';
import { setLoadingState } from './isLoading';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import TrackPlayer from 'react-native-track-player';

export const InitializeApp =
  (): any => async (dispatch: ThunkDispatch<RootState, any, AnyAction>) => {
    dispatch(setLoadingState('pending'));

    const grantPermissionResult = await MediaLibrary.requestPermissionsAsync();
    if (grantPermissionResult.status !== 'granted') {
      Alert.alert(
        '권한이 수락되지 않았습니다.',
        '계속이용하실려면 권한을 수락해주세요!',
        [
          { text: 'Okay!' },
          {
            text: '다시 시도하세요!',
            onPress: () => {
              dispatch(InitializeApp());
            },
          },
        ],
      );
      return;
    }

    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    });

    const getAudios = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 99999999,
    });

    async function getAlbumArtImageUri(albumId: string): Promise<string | null> {
      const images = await MediaLibrary.getAssetsAsync({
        album: albumId,
        mediaType: 'photo',
      });
      return images.assets.length ? images.assets[0].uri : null;
    }

    const albumArtPromises = getAudios.assets.map(async audio => {
      const albumArtUri = audio.albumId ? await getAlbumArtImageUri(audio.albumId) : null;
      return { ...audio, albumArtUri };
    });

    const audios = await Promise.all(albumArtPromises);

    audios.sort((s1, s2) => {
      return s1?.filename.toLowerCase().localeCompare(s2?.filename.toLowerCase());
    });

    const tracksToAdd = audios.map(song => ({
      id: song.id,
      url: song.uri,
      title: song.filename,
      duration: song.duration,
    }));

    dispatch(setSongs(audios));

    await TrackPlayer.add(tracksToAdd);

    dispatch(setLoadingState('resovle'));
  };
