import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import { setSong2 } from '../store/songs';
import { RootState } from '../store/rootReducer';

const Test = () => {
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       // 권한이 없을 경우의 처리
  //       return;
  //     }

  //     const media = await MediaLibrary.getAssetsAsync({
  //       mediaType: MediaLibrary.MediaType.audio,
  //       sortBy: [MediaLibrary.SortBy.default],
  //       first: 500,
  //     });

  //     const musicList = media.assets.map(music => ({
  //       id: music.id,

  //       duration: music.duration,
  //       uri: music.uri,
  //     }));

  //     console.log(musicList.map(e => e.id));
  //     dispatch(setSong2(musicList));
  //   })();
  // }, []);

  const songs = useSelector(({ songs: { songs } }: any) =>
    songs.filter(({ isExcluded }: any) => !isExcluded),
  );

  // console.log(songs2);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text style={styles.set}>
        {songs.map((e: { id: any }) => {
          return (
            <View style={styles.idContainer} key={e.id}>
              <Text style={styles.idText}>{e.id}</Text>
            </View>
          );
        })}
      </Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  set: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  idContainer: {
    flexDirection: 'row',
  },
  idText: {
    marginRight: 10,
  },
});
