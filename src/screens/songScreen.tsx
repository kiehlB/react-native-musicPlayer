import React, { useEffect } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { InitializeApp } from '../store/toolkit';
import Test from '../components/test';
export type SongScreenProps = {};

export default function SongScreen(props: SongScreenProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InitializeApp());
  }, []);

  return (
    <View>
      <Test />
    </View>
  );
}

const styles = StyleSheet.create({});
