import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Song {
  filename: string;
  album: string | undefined;
  artist: string | undefined;
  genre: string | undefined;
  id: string;
  isExcluded: boolean;
  uri: string;
  duration: string;
}

class PlayListItem extends React.PureComponent<any> {
  render() {
    const { filename, album, artist, genre, id, duration } = this.props.item;

    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.thumbnail}>
          <MaterialIcons name="audiotrack" size={24} color="black" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {filename}
          </Text>
          <Text style={styles.artist}>
            {album || 'unknown'} - {artist || 'unknown'}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.duration}>{duration}</Text>
          <Text style={styles.iconContainer}>1</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 8,
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
