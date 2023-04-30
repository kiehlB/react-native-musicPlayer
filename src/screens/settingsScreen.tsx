import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { InitializeApp } from '../store/toolkit';

import { SafeAreaView } from 'react-native-safe-area-context';
export type SettingsScreenProps = {};

export default function SettingsScreen(props: SettingsScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Text>settings</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
