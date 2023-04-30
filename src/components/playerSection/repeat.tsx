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

export const Repeat: React.FC<Props> = () => {
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
        <MaterialIcons name="replay" size={24} color="black" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 40,
  },
});
