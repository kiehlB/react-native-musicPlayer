import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  withSpring,
  interpolate,
  Extrapolate,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import { WIDTH, HEIGHT, BOTTOM_INSET, SNAP_TOP, SNAP_BOTTOM } from '../../lib/dimensions';

import { Actions } from './actions';

import TrackPlayer, { useProgress } from 'react-native-track-player';
import { Context } from '../../context/animationContext';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { Section } from '../playerSection';
import { NextPrev } from './arrow';
import { MiniSlider } from './miniSlider';
import { PlayerHeader } from './playerHeader';
import { View } from '../common/theme';
import { Shuffle } from '../playerSection/shuffle';
import { Liked } from '../playerSection/liked';
import { Repeat } from '../playerSection/repeat';

export const Player = () => {
  const translateY = useSharedValue(SNAP_BOTTOM - 40);

  const tapGestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onEnd: (event: any, ctx) => {
      const { absoluteY } = event;
      const min = SNAP_BOTTOM - 40;
      const max = SNAP_TOP;
      const endY = ctx.startY + event.absoluteY;

      if (endY > min) {
        translateY.value = withSpring(max, { overshootClamping: true });
      } else if (endY < max) {
        translateY.value = withSpring(min, { overshootClamping: true });
      } else {
        const isMovingUp = endY - ctx.startY < 0;
        const toValue = isMovingUp ? max : min;
        const velocity = Math.abs(absoluteY.velocity);

        translateY.value = withSpring(toValue, {
          velocity,
          stiffness: 80,
          overshootClamping: true,
        });
      }
    },
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      const min = SNAP_BOTTOM - 40;
      const max = SNAP_TOP;

      let value = ctx.startY + event.translationY;

      if (value > min) {
        value = min;
      } else if (value < max) {
        value = max;
      }

      translateY.value = value;
    },
    onEnd: event => {
      const velocity = event.velocityY;
      const toValue = velocity > 0 ? SNAP_BOTTOM - 40 : 0;

      translateY.value = withSpring(toValue, {
        velocity,
        stiffness: 40,
        overshootClamping: true,
      });
    },
  });

  const percent = useDerivedValue(() => {
    return interpolate(
      translateY.value,
      [SNAP_BOTTOM - 40, SNAP_TOP],
      [0, 100],
      Extrapolate.CLAMP,
    );
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: 0 }, { translateY: translateY.value }],
    };
  });

  return (
    <Context.Provider value={{ percent }}>
      <Animated.View style={[styles.container, style]}>
        {/* @ts-ignore */}
        <TapGestureHandler onGestureEvent={tapGestureHandler}>
          <Animated.View style={{ width: '100%', height: '15%' }}>
            <PanGestureHandler onGestureEvent={gestureHandler}>
              <Animated.View style={styles.overlay}>
                <MiniSlider />
                <PlayerHeader />
                <Section />
                <View style={styles.iconsContainer}>
                  <Shuffle />
                  <Liked />
                  <Repeat />
                </View>
                <Actions />
                <NextPrev />
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      </Animated.View>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    paddingBottom: BOTTOM_INSET,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(27, 35, 35)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgb(27, 35, 35)',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgb(27, 35, 35)',
  },
});
