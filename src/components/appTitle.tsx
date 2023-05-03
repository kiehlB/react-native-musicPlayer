import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from './common/theme';
import AppBar from './appBar';

export type AppTitleProps = {};

export default function AppTitle(props: AppTitleProps) {
  return (
    <View style={styles.header}>
      <AppBar title="Music List" />
    </View>
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
    height: '92%',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
