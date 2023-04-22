import { Dimensions, StyleSheet, Text, TextStyle } from 'react-native';
import React, { ReactNode } from 'react';

interface CustomTextProps {
  children: ReactNode;
  style?: TextStyle;
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  text: {
    fontSize: windowWidth / 20,
  },
});

function CustomText(props: CustomTextProps) {
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
}

export default CustomText;
