import { Animated, Easing } from 'react-native';
import Lottie from 'lottie-react-native';
import { useEffect, useRef } from 'react';

export default function LodingScreen() {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Lottie
      autoPlay
      loop
      source={require('../assets/json/loading.json')}
      progress={animationProgress.current}
    />
  );
}
