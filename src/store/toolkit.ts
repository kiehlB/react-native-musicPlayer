import * as MediaLibrary from 'expo-media-library';
import {Alert} from 'react-native';
import {AppThunk} from './store';
import {Audio, AVPlaybackStatus} from 'expo-av';
import {setSongs} from './songs';
import {setLoadingState} from './isLoading';
import {
  setBuffering,
  setCurrentId,
  setCurrentPosition,
  setPlaybackInstance,
  setPlaying,
} from './audio';
import SettingsST from '../lib/SettingsST';
import {AnyAction, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from './rootReducer';

export const InitializeApp =
  (): any => async (dispatch: ThunkDispatch<RootState, any, AnyAction>) => {
    dispatch(setLoadingState('pending'));

    const grantPermissionResult = await MediaLibrary.requestPermissionsAsync();
    if (grantPermissionResult.status !== 'granted') {
      Alert.alert(
        '권한이 수락되지 않았습니다.',
        '계속이용하실려면 권한을 수락해주세요!',
        [
          {text: 'Okay!'},
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

    const audios = (
      await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: 1,
      })
    ).assets;

    audios.sort((s1: any, s2: any) => {
      return s1?.filename
        .toLowerCase()
        .localeCompare(s2?.filename.toLowerCase());
    });

    console.log(audios[0]?.id);

    dispatch(setSongs(audios));

    // dispatch(LoadSong(audios[0]?.id));

    dispatch(setLoadingState('resovle'));
  };

export const LoadSong =
  (id: string, shouldPlay: boolean = false): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setCurrentId(id));

    const {
      audio: {isPlaying, volume, playbackInstance: prevPlaybackInstance},
      audios: {audios},
    }: any = getState();

    await prevPlaybackInstance?.unloadAsync();

    const playbackInstance = new Audio.Sound();

    // playbackInstance.setOnPlaybackStatusUpdate((playbackStatus: AVPlaybackStatus) => {
    //   if (!playbackStatus.isLoaded) {
    //     if (playbackStatus.error) {
    //       console.log(
    //         `Encountered a fatal error during playback: ${playbackStatus.error}`,
    //       );
    //     }
    //   } else {
    //     dispatch(setBuffering(playbackStatus.isBuffering));
    //     dispatch(setCurrentPosition(playbackStatus.positionMillis));

    //     if (playbackStatus.didJustFinish && !playbackStatus.isLooping)
    //       dispatch(NextTrack());
    //     if (
    //       playbackStatus.shouldPlay &&
    //       !playbackStatus.isPlaying &&
    //       playbackStatus.isLoaded &&
    //       !playbackStatus.isBuffering &&
    //       !playbackStatus.didJustFinish
    //     )
    //       playbackInstance.playAsync();
    //   }
    // });
    // await playbackInstance.loadAsync(
    //   {
    //     uri: audios.find((song: { id: string }) => song.id === id)!.uri,
    //   },
    //   {
    //     shouldPlay: isPlaying || shouldPlay,
    //     volume,
    //   },
    // );

    // dispatch(setPlaying(isPlaying || shouldPlay));

    // dispatch(setPlaybackInstance(playbackInstance));
  };

export const NextTrack = (): AppThunk => async (dispatch, getState) => {
  const {
    audio: {currentId},
  } = getState() as any;
  const nextSong = SettingsST.getInstance().getNext(currentId) as any;

  dispatch(LoadSong(nextSong.id, true));
};
