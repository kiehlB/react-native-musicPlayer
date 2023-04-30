import React, { useEffect } from 'react';
import {
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';
import Menu from '../common/menu';

interface Song {
  filename: string;
  album: string | undefined;
  artist: string | undefined;
  genre: string | undefined;
  id: string;
  isExcluded: boolean;
  uri: string;
  duration: any;
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

const PlayList = () => {
  const songs = useSelector(({ songs: { songs } }: any) =>
    songs.filter(({ isExcluded }: any) => !isExcluded),
  );

  const renderItem = ({ item }: { item: Song }) => <SongItem item={item} />;
  const keyExtractor = ({ id }: { id: string }) => id;

  const ITEM_HEIGHT = 90;
  const getItemLayout = (data: any, index: any) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index, // idx, not data.length
      index,
    };
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
        }}>
        <Text style={{ fontSize: 16, color: 'black', paddingTop: 6 }}>
          전체 목록 <Text style={{ fontSize: 14, color: '#888' }}>({songs?.length})</Text>
        </Text>
        <View style={styles.headerIcon}>
          <Menu>
            <MaterialIcons name="sort" size={24} color="black" style={[styles.search]} />
          </Menu>
        </View>
      </View>
      <FlatList
        data={songs}
        contentContainerStyle={{
          marginTop: 16,
        }}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews={true}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

export default PlayList;

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
