import React, { useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, useThemeColor } from '../components/common/theme';
import PlayList from '../components/playList/playList';

export type HomeScreenProps = {};

export default function HomeScreen(props: HomeScreenProps) {
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <SafeAreaView>
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.musicContainer}>
          <PlayList />
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
