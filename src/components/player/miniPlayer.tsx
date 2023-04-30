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
import { MiniSlider } from './position';
import { WIDTH, HEIGHT, BOTTOM_INSET, SNAP_TOP, SNAP_BOTTOM } from '../../lib/dimensions';

import { Actions } from './actions';

import TrackPlayer, { useProgress } from 'react-native-track-player';
import { Context } from '../../context/animationContext';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { Section } from '../playerSection';
import { NextPrev } from './arrow';

export const Player = () => {
  const { duration } = useProgress();

  useEffect(() => {
    const getTrack = async () => {
      const trackIndex = (await TrackPlayer.getCurrentTrack()) as any;
      const trackObject = (await TrackPlayer.getTrack(trackIndex)) as any;
      console.log(`Title: ${trackObject?.title}`);
      console.log(`duration' ${trackObject?.duration}`);
    };

    getTrack();
  }, [duration]);

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
          <Animated.View
            style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
            <PanGestureHandler onGestureEvent={gestureHandler}>
              <Animated.View style={styles.overlay}>
                <MiniSlider />
                <Section />
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
