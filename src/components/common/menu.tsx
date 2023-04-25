import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Menu = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-100);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    opacity.value = withTiming(isOpen ? 0 : 1, { duration: 300 });
    translateY.value = withTiming(isOpen ? 180 : 200, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Animated.View style={[styles.menu, animatedStyle]}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Item 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Item 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Item 3</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <TouchableOpacity onPress={toggleMenu}>
        <Text>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  menuContainer: {
    position: 'absolute',
    bottom: 24,
    right: 0,
    flexDirection: 'column',
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 160,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default Menu;
