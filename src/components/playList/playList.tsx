import React, { useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TrackPlayer, { State } from 'react-native-track-player';
import PaPerMenu from '../common/menu';

interface Song {
  filename: string;
  album: string | undefined;
  artist: string | undefined;
  genre: string | undefined;
  id: string;
  isExcluded: boolean;
  uri: string;
}

interface SongItemProps {
  item: Song;
}

class SongItem extends React.PureComponent<SongItemProps> {
  handlePress = async () => {
    const { id, uri } = this.props.item;

    await TrackPlayer.reset();
    await TrackPlayer.add({
      id,
      url: uri,
      title: this.props.item.filename,
      artist: this.props.item.artist || 'unknown',
      artwork: 'http://example.com/songs/artwork.jpg',
    });

    // Play the song
    await TrackPlayer.play();
  };

  render() {
    const { filename, album, artist, genre, id } = this.props.item;
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={styles.view}>
          <Text numberOfLines={1}>
            {filename} - {genre || 'unknown'}
          </Text>
          <Text numberOfLines={1}>
            {album || 'unknown'} - {artist || 'unknown'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const PlayList = () => {
  const songs = useSelector(({ songs: { songs } }: any) =>
    songs.filter(({ isExcluded }: any) => !isExcluded),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={({ item }: { item: Song }) => <SongItem item={item} />}
        keyExtractor={({ id }: { id: string }) => id}
        removeClippedSubviews={true}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

export default PlayList;

const styles = StyleSheet.create({
  container: {},
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
    marginBottom: 40,
  },
});
