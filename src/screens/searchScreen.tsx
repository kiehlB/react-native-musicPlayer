import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { InitializeApp } from '../store/toolkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/common/theme';
import PlayList from '../components/playList/playList';

export type SearchScreenProps = {};

export default function SearchScreen(props: SearchScreenProps) {
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.musicContainer}>
          <Text>hello</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicContainer: {
    height: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
