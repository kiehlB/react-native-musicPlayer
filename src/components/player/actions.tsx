import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { Content } from './content';
import { Controls } from './controls';
import { WIDTH } from '../../lib/dimensions';

export const Actions = () => {
  const offsetY = useSharedValue(0);

  const onLayout = useCallback(({ nativeEvent: { layout } }: any) => {
    offsetY.value = layout.y;
  }, []);

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Content {...{ offsetY }} />
      <Controls {...{ offsetY }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 120,
  },
});
