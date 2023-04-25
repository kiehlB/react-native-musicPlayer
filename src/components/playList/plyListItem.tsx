import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Song {
  filename: string;
  album: string | undefined;
  artist: string | undefined;
  genre: string | undefined;
  id: string;
  isExcluded: boolean;
  url: string;
  duration: string;
}

const PlayListItem = React.memo(
  ({ item, onPress }: { item: Song; onPress: () => void }) => {
    const { filename, album, artist, genre, duration } = item;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.thumbnail}>1</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {filename}
          </Text>
          <Text style={styles.artist}>
            {' '}
            {album || 'unknown'} - {artist || 'unknown'}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.duration}>{duration}</Text>
          <Text style={styles.iconContainer}>1</Text>
        </View>
      </TouchableOpacity>
    );
  },
);

export default PlayListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'red',
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    overflow: 'hidden',
    paddingRight: 4,
    paddingLeft: 4,
  },
  artist: {
    fontSize: 14,
    color: '#888',
  },
  rightContainer: {
    flexDirection: 'row',
  },
  duration: {
    fontSize: 12,
    color: '#888',
  },
  iconContainer: { fontSize: 12, color: '#888' },
});
