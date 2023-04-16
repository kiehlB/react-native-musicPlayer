import { Album, Artist, Genre } from '../lib/types';
import { Song } from '../store/songs';

export const filterAlbums = (albums: Album[], searchValue: string): Album[] => {
  return albums.filter(({ name }) =>
    name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const filterGenres = (genres: Genre[], searchValue: string): Genre[] => {
  return genres.filter(({ name }) =>
    name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const filterArtists = (artists: Artist[], searchValue: string): Artist[] => {
  return artists.filter(({ name }) =>
    name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const filterSongs = (songs: Song[], searchValue: string): Song[] => {
  return songs
    .filter((song: any) => !song.isExcluded)
    .filter(({ title }: { title?: string }) => {
      if (title) {
        return title.toLowerCase().includes(searchValue.toLowerCase());
      }
      return false;
    });
};
