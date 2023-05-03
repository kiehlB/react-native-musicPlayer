import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useAnimation } from '../../context/animationContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { HEADER_HEIGHT } from '../../lib/dimensions';

interface Props {}

export const PlayerHeader: React.FC<Props> = () => {
  const { percent } = useAnimation();

  const opacity = useDerivedValue(() => {
    return interpolate(percent.value, [80, 100], [0, 1]);
  });

  const style = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View pointerEvents="none" style={[styles.container, style]}>
      <View>
        <AntDesign name="close" size={24} color="#FFFFFFDE" />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },

  middle: {
    flex: 1,
    alignItems: 'center',
  },

  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
