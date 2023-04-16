import * as MediaLibrary from 'expo-media-library';

export const getMediaList = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    return [];
  }

  const media = await MediaLibrary.getAssetsAsync({
    mediaType: MediaLibrary.MediaType.audio,
    sortBy: [MediaLibrary.SortBy.default],
  });

  const list = media.assets.map(music => ({
    id: music.id,
    duration: music.duration,
    uri: music.uri,
  }));

  return list;
};
