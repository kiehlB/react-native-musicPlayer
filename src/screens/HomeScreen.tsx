import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {InitializeApp} from '../store/toolkit';
import Test from '../components/test';

import {SafeAreaView} from 'react-native-safe-area-context';
export type HomeScreenProps = {};

export default function HomeScreen(props: HomeScreenProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InitializeApp());
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Test />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
