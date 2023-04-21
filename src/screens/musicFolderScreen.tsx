import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { InitializeApp } from '../store/toolkit';
import Test from '../components/test';

import { SafeAreaView } from 'react-native-safe-area-context';
export type MusicFolderScreenProps = {};

export default function MusicFolderScreen(props: MusicFolderScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Text>hello</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
