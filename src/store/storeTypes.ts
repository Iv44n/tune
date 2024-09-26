import type { PlaylistTypeValue, Song } from '../types/dataMusic'

interface PlayingMusic extends Song {
  playlistLenght: number;
}

interface PropsForFetchSong {
  lib: PlaylistTypeValue
  id: number
}

export interface MusicStore {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  playingMusic: PlayingMusic | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  fetchSong: ({ lib, id }: PropsForFetchSong ) => Promise<void>;
}
