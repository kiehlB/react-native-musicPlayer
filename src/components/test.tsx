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
import TrackPlayer from 'react-native-track-player';
import { Button } from 'react-native-paper';

interface Song {
  filename: string;
  album: string | undefined;
  artist: string | undefined;
  genre: string | undefined;
  id: string;
  isExcluded: boolean;
  url: string;
}

interface SongItemProps {
  item: Song;
}

class SongItem extends React.PureComponent<SongItemProps> {
  render() {
    const { filename, album, artist, genre, id } = this.props.item;
    return (
      <TouchableOpacity>
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

const Test = () => {
  const [sound, setSound] = React.useState<any>(null);
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
      <View>
        <Button icon="camera">Press me</Button>
      </View>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    height: 1200,
  },
  set: {
    marginLeft: 20,
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
  },
});
