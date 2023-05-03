import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Animated, {
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useAnimation } from '../../context/animationContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {}

export const Shuffle: React.FC<Props> = () => {
  const { percent } = useAnimation();

  const [active, setActive] = useState<boolean>(false);

  const onPress = () => {
    setActive(!active);
  };

  const opacity = useDerivedValue(() => {
    return interpolate(percent.value, [0, 90, 100], [0, 0, 1]);
  });

  const style = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons name="shuffle" size={36} color="#FFFFFFDE" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
