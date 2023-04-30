import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Event, State, useTrackPlayerEvents } from 'react-native-track-player';
import Animated, {
  Easing,
  withTiming,
  withRepeat,
  interpolate,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  cancelAnimation,
} from 'react-native-reanimated';

import { WIDTH, MINI_HEIGHT, SECTION_HEIGHT } from '../../lib/dimensions';
import { useAnimation } from '../../context/animationContext';

const size = SECTION_HEIGHT - 70;

const events = [Event.PlaybackState, Event.PlaybackError];

interface Props {
  offsetY: Animated.SharedValue<number>;
}

export const Record: React.FC<Props> = ({ offsetY }: Props) => {
  const { percent } = useAnimation();

  const spin = useSharedValue(1);

  const animation = () => {
    cancelAnimation(spin);

    spin.value = withRepeat(
      withTiming(spin.value - 1, { easing: Easing.linear, duration: 2000 }),
      -1,
      false,
    );
  };

  useTrackPlayerEvents(events, async (event: any) => {
    if (event.type === Event.PlaybackState) {
      if (event.state === State.Playing) {
        animation();
      } else if (event.state === State.Paused) {
        cancelAnimation(spin);
      } else if (event.state === State.Stopped) {
        spin.value = 0;
        cancelAnimation(spin);
      }
    } else if (event.type === Event.PlaybackTrackChanged) {
      spin.value = 0;
    }
  });

  const translateY = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [offsetY.value * -1, 0]);
  });

  const width = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [MINI_HEIGHT, WIDTH]);
  });

  const radius = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [MINI_HEIGHT, size]);
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: radius.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const padding = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [10, 0]);
  });

  const rotate = useDerivedValue(() => {
    const deg = interpolate(spin.value, [1, 0], [0, 360]);

    return `${deg}deg`;
  });

  const wrapperStyle = useAnimatedStyle(() => {
    return {
      width: radius.value,
      height: radius.value,
      padding: padding.value,
      transform: [{ rotateZ: rotate.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[wrapperStyle]}>
        <Lp />
      </Animated.View>
    </Animated.View>
  );
};

const Lp = () => {
  const { percent } = useAnimation();

  const style = useAnimatedStyle(() => {
    const spin = interpolate(percent.value, [0, 100], [0, 360]);
    return {
      transform: [{ rotate: `${spin}deg` }],
    };
  });

  return (
    <Animated.View style={[styles.cover, style]}>
      <Image
        source={require('../../assets/record.png')}
        style={styles.grooves}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    position: 'absolute',
    alignItems: 'center',
  },

  grooves: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  wrapper: {},

  cover: {
    width: '100%',
    height: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
  },
});
