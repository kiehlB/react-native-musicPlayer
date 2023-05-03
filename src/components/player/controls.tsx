import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { MINI_CONTROL_WIDTH, MINI_HEIGHT, WIDTH } from '../../lib/dimensions';
import { useAnimation } from '../../context/animationContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';

interface Props {
  offsetY: Animated.SharedValue<number>;
}

export const Controls: React.FC<Props> = ({ offsetY }: Props) => {
  const { percent } = useAnimation();

  const offsetX = useSharedValue(0);

  const playerState = usePlaybackState();

  const isPlaying = playerState === State.Playing;

  const onPressPrevious = async () => {};

  const onLayout = useCallback(({ nativeEvent: { layout } }: any) => {
    offsetX.value = layout.x;
  }, []);

  const translateY = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [(offsetY.value + MINI_HEIGHT) * -1, 0]);
  });

  const translateX = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [offsetX.value, 0]);
  });

  const width = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [MINI_CONTROL_WIDTH, WIDTH * 0.5]);
  });

  const height = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [MINI_HEIGHT, 60]);
  });

  const paddingRight = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [10, 0]);
  });

  const previousOpacity = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [0, 1]);
  });

  const nextOpacity = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [0, 1]);
  });

  const style = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      paddingRight: paddingRight.value,
      transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(percent.value, [0, 100], [0.1, 0]);

    return {
      width: interpolate(percent.value, [0, 100], [50, 55]),
      heigth: interpolate(percent.value, [0, 100], [50, 55]),
      padding: interpolate(percent.value, [0, 100], [10, 5]),
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    };
  });

  const onPressNext = async () => {
    await TrackPlayer.skipToNext();
  };

  return (
    <View onLayout={onLayout} style={styles.frame}>
      <Animated.View style={[styles.container, style]}>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <TouchableOpacity onPress={onPressPrevious}>
              <MaterialCommunityIcons size={36} name="skip-previous" color="#FFFFFFDE" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ width: 50, height: 50, marginHorizontal: 5 }}>
            <Animated.View
              style={[
                styles.button,
                {
                  maxHeight: 50,
                },
                buttonStyle,
              ]}>
              {isPlaying ? (
                <MaterialCommunityIcons
                  size={36}
                  name="pause"
                  color="#FFFFFFDE"
                  onPress={() => {
                    TrackPlayer.pause();
                  }}
                />
              ) : (
                <MaterialCommunityIcons
                  size={36}
                  name="play"
                  color="#FFFFFFDE"
                  onPress={() => {
                    TrackPlayer.play();
                  }}
                />
              )}
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity onPress={onPressNext}>
              <MaterialCommunityIcons size={36} name="skip-next" color="#FFFFFFDE" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    width: WIDTH * 0.5,
    alignSelf: 'center',
  },

  container: {
    height: 60,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },

  buttons: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  button: {
    width: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
  },
});
