import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, useThemeColor } from './common/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type HeaderProps = {
  title: string;
};

export default function AppBar({ title }: HeaderProps) {
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
        <MaterialIcons name="search" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
        <MaterialIcons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 20,
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
});
