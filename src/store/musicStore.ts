import { create } from 'zustand'
import type { Song } from '../types/dataMusic'

interface PlayingMusic extends Song {
  typePlaylist: string;
  playlistLenght: number;
}

interface MusicStore {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  playingMusic: PlayingMusic | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  fetchSong: ({ lib, id }: { lib: string; id: number} ) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  playingMusic: null,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  async fetchSong({ lib, id }) {
    try {
      const res = await fetch(`/api/songApi?lib=${lib}&id=${id}`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await res.json()
      set({ playingMusic: data })
    } catch (error) {
      console.error(error)
    }
  }
}))
