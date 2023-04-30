import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import TrackPlayer, {
  Event,
  State,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Animated, {
  Easing,
  runOnJS,
  interpolate,
  Extrapolate,
  withTiming,
  cancelAnimation,
  useSharedValue,
  useDerivedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { useAnimation } from '../../context/animationContext';
import {
  PI,
  centerX,
  circle,
  cx,
  cy,
  d,
  padding,
  strokeDasharray,
  viewBox,
  width,
} from '../../lib/playerDimensions';
import { SLIDER_HEIGHT, WIDTH } from '../../lib/dimensions';

export const Colors = {
  background: 'rgb(35,43,43)',
  foreground: 'rgb(23,30,31)',
  mute: 'rgb(121, 127, 139)',
  white: 'rgb(255, 255, 255)',
  light: 'rgb(168, 178, 177)',
  black: 'rgb(0,0,0)',
  primary: 'rgb(227, 42, 118)',
  blue: 'rgb(103, 213, 254)',
};

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function atan2(y: number, x: number) {
  'worklet';

  return Math.atan2(y, x);
}

const events = [Event.PlaybackState, Event.PlaybackError];

let timeout: any;

interface Props {
  isTouching: boolean;

  setTime: (value: number) => void;
  setTouching: (value: boolean) => void;
}

export const Slider: React.FC<Props> = ({ isTouching, setTime, setTouching }: Props) => {
  const { percent: getPosition } = useAnimation();
  const { position, buffered, duration } = useProgress();
  const percent = useSharedValue(0);
  const instant = useSharedValue(0);

  const [playbackState, setPlaybackState] = useState(null);

  const setTimePosition = async (value: number, audio: boolean = false) => {
    if (duration) {
      const time = (duration / 100) * value;
      setTime(time);
      if (audio) {
        await TrackPlayer.seekTo(time);
      }
    }

    setTouching(false);
  };

  useTrackPlayerEvents(events, async (event: any) => {
    if (event.type === Event.PlaybackTrackChanged) {
      if (event.nextTrack) {
        percent.value = withTiming(0, {
          duration: 500,
        });
      }
    } else if (event.type === Event.PlaybackState) {
      setPlaybackState(event.state);
    }
  });

  useEffect(() => {
    clearTimeout(timeout);
    const isPlaying = playbackState === State.Playing;

    if (!isTouching && isPlaying) {
      timeout = setTimeout(setCurrentPosition, 1000);
    }
  }, [position, isTouching, playbackState]);

  const setCurrentPosition = async () => {
    if (position >= 0 && duration) {
      const value = (position * 100) / duration;

      percent.value = withTiming(value, {
        duration: 1000,
        easing: Easing.linear,
      });
    }

    timeout = setTimeout(setCurrentPosition, 1000);
  };

  const tapGestureHandler = useAnimatedGestureHandler({
    onStart: (event: any) => {
      runOnJS(setTouching)(true);

      const value = interpolate(atan2(event.y, event.x - centerX), [PI, 0], [0, 100]);

      instant.value = value;
      percent.value = withTiming(value);
    },
    onEnd: () => {
      runOnJS(setTimePosition)(instant.value, true);
    },
  });

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (event: any) => {
      runOnJS(setTouching)(true);

      const value = interpolate(atan2(event.y, event.x - centerX), [PI, 0], [0, 100]);

      percent.value = withTiming(value);
    },

    onActive: event => {
      cancelAnimation(percent);

      let value = 0;

      if (event.y < 0) {
        if (event.x < centerX) {
          value = 0;
        } else {
          value = 100;
        }
      } else {
        value = interpolate(atan2(event.y, event.x - centerX), [PI, 0], [0, 100]);
      }

      percent.value = value;
      runOnJS(setTimePosition)(value);
    },
    onEnd: () => {
      runOnJS(setTimePosition)(percent.value, true);
    },
  });

  const tetha = useDerivedValue(() => {
    const positionValue = interpolate(getPosition.value, [0, 50, 100], [0, 0, 100]);
    const value = percent.value - 100 + positionValue;

    return interpolate(value, [0, 100], [PI, 0], Extrapolate.CLAMP);
  });

  const x = useDerivedValue(() => {
    const radius = width / 2 - padding;

    return cx + radius * Math.cos(tetha.value);
  });

  const y = useDerivedValue(() => {
    const radius = width / 2 - padding;

    return cy + radius * Math.sin(tetha.value);
  });

  const strokeDashoffset = useDerivedValue(() => {
    return interpolate(tetha.value, [PI, 0], [strokeDasharray, 0], Extrapolate.CLAMP);
  });

  const pathProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: strokeDashoffset.value,
    };
  });

  const shadowPathProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: strokeDashoffset.value,
    };
  });

  const circleProps = useAnimatedProps(() => {
    return {
      cx: x.value,
      cy: y.value,
    };
  });

  const circleShadowProps = useAnimatedProps(() => {
    return {
      cx: x.value,
      cy: y.value,
    };
  });

  const opacity = useDerivedValue(() => {
    return interpolate(getPosition.value, [0, 80, 100], [0, 0, 1]);
  });

  const translateY = useDerivedValue(() => {
    return interpolate(getPosition.value, [0, 100], [200, 0]);
  });

  const style = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      {/* @ts-ignore */}
      <TapGestureHandler onGestureEvent={tapGestureHandler}>
        <Animated.View>
          <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View>
              <Svg viewBox={viewBox} style={styles.svg}>
                <Path d={d} fill="none" stroke={Colors.mute} strokeWidth={2} />

                <AnimatedPath
                  d={d}
                  fill="none"
                  stroke="rgba(227, 42, 118, .5)"
                  strokeWidth={3}
                  strokeDasharray={strokeDasharray}
                  animatedProps={shadowPathProps}
                />

                <AnimatedPath
                  d={d}
                  fill="none"
                  stroke={Colors.primary}
                  strokeWidth={2}
                  strokeDasharray={strokeDasharray}
                  animatedProps={pathProps}
                />

                <AnimatedCircle
                  r={circle}
                  fill={Colors.primary}
                  animatedProps={circleShadowProps}
                />

                <AnimatedCircle
                  r={circle + 1}
                  fill={'rgba(227, 42, 118, .3)'}
                  animatedProps={circleProps}
                />
              </Svg>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: SLIDER_HEIGHT,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
});
