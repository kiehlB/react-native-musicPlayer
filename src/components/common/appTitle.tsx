import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import AppBar from '../appBar';
import { View } from './theme';

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
