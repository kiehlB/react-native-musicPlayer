import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Song } from './playList';

interface PlayListItemProps {
  item: Song;
  allSongs: Song[];
}

class PlayListItem extends React.PureComponent<PlayListItemProps> {
  handlePress = async () => {
    const { id, uri } = this.props.item as any;
    const { allSongs } = this.props as any;
    const songIndex = allSongs.findIndex((song: Song) => song.id === id);
    await TrackPlayer.skip(songIndex);
    await TrackPlayer.play();
  };

  render() {
    const { filename, album, artist, genre, id } = this.props.item;

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={this.handlePress}>
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
          <View style={styles.iconContainer}>
            <View style={{ marginRight: 12, marginLeft: 12 }}>
              <AntDesign name="hearto" size={24} color="black" />
            </View>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default PlayListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    height: 25,
    aspectRatio: 1,
  },
  search: {},
  headerIcon: {
    flexDirection: 'row',
    marginRight: 0,
  },
  set: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  idContainer: {
    flexDirection: 'row',
  },
  flatList: {},
  idText: {
    marginRight: 10,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  view: {
    marginBottom: 60,

    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    height: 50,
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
  iconContainer: {
    flexDirection: 'row',
  },
});
