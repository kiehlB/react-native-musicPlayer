import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Menu from '../common/menu';
import PlayListItem from './plyListItem';

export interface Song {
  filename: string;
  album: string | undefined;
  artist: string | undefined;
  genre: string | undefined;
  id: string;
  isExcluded: boolean;
  uri: string;
  duration: string;
}

const PlayList = () => {
  const songs = useSelector(({ songs: { songs } }: any) =>
    songs.filter(({ isExcluded }: any) => !isExcluded),
  );

  const renderItem = useCallback(
    ({ item }: { item: Song }) => <PlayListItem item={item} allSongs={songs} />,
    [songs],
  );
  const keyExtractor = useCallback(({ id }: { id: string }) => id, []);

  const ITEM_HEIGHT = 90;
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

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
