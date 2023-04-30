import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useAnimation } from '../../context/animationContext';
import { useProgress } from 'react-native-track-player';
import { Text } from '../common/theme';
import { timeFormat } from '../../lib/format';
import { SLIDER_HEIGHT } from '../../lib/dimensions';

let timeout: any;

interface Props {
  time: number;
  isTouching: boolean;
}

export const Duration: React.FC<Props> = ({ time, isTouching }: Props) => {
  const { position, duration } = useProgress();
  const { percent } = useAnimation();

  const [durationState, setDuration] = useState(0);
  const [positionState, setPosition] = useState(0);

  useEffect(() => {
    clearTimeout(timeout);
    setCurrentPosition();
  }, []);

  useEffect(() => {
    if (time) {
      setPosition(time);
    }
  }, [time]);

  useEffect(() => {
    clearTimeout(timeout);

    if (!isTouching) {
      timeout = setTimeout(setCurrentPosition, 1000);
    }
  }, [isTouching]);

  const setCurrentPosition = async () => {
    setPosition(position);
    setDuration(duration);

    timeout = setTimeout(setCurrentPosition, 1000);
  };

  const opacity = useDerivedValue(() => {
    return interpolate(percent.value, [0, 80, 100], [0, 0, 1]);
  });

  const positionStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const durationStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Fragment>
      <Animated.View style={[styles.position, positionStyle]}>
        <Text numberOfLines={1}>{timeFormat(position)}</Text>
      </Animated.View>
      <Animated.View style={[styles.duration, durationStyle]}>
        <Text numberOfLines={1}>{timeFormat(duration)}</Text>
      </Animated.View>
    </Fragment>
  );
};

const bottom = SLIDER_HEIGHT - 10;

const styles = StyleSheet.create({
  position: {
    bottom,
    left: 0,
    width: 70,
    height: 25,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  duration: {
    bottom,
    right: 0,
    width: 70,
    height: 25,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
