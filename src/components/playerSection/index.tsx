import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { WIDTH, SECTION_HEIGHT } from '../../lib/dimensions';
import { Record } from './record';
import { Duration } from './duration';
import { Shuffle } from './shuffle';
import { Repeat } from './repeat';
import { Slider } from './slider';
import { Liked } from './liked';

export const Section = () => {
  const offsetY = useSharedValue(0);

  const [time, setTime] = useState(0);
  const [isTouching, setTouching] = useState(false);

  const onLayout = useCallback(({ nativeEvent: { layout } }: any) => {
    offsetY.value = layout.y;
  }, []);

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Record {...{ offsetY }} />
      <Slider {...{ isTouching, setTouching, setTime }} />
      <Duration {...{ time, isTouching }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: SECTION_HEIGHT,
    justifyContent: 'flex-end',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 24,
  },
  icon: {},
  iconCenter: {},
});
