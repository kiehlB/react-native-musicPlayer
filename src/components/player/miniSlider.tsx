import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  withTiming,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useProgress } from 'react-native-track-player';

const window = Dimensions.get('window');

interface Props {}

export const MiniSlider: React.FC<Props> = () => {
  const { position, duration } = useProgress();

  const getPosition = useSharedValue(0);

  useEffect(() => {
    if (position > 0 && duration > 0) {
      const value = (position * 100) / duration;
      getPosition.value = withTiming(value, {
        duration: 0,
        easing: Easing.linear,
      });
    }
  }, [position, duration]);

  const width = useDerivedValue(() => {
    return interpolate(getPosition.value, [0, 100], [0, window.width]);
  });

  const style = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBar, style]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -3,
    left: 0,
    height: 3,
    position: 'absolute',
  },
  progressBarBackground: {
    width: window.width,
    height: 3,
    backgroundColor: 'grey',
  },
  progressBar: {
    height: 3,
    position: 'absolute',
    left: 0,
    backgroundColor: 'blue',
  },
  remainingTimeText: {
    marginTop: 10,
  },
});
