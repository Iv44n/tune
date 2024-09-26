import { create } from 'zustand'
import type { MusicStore } from './storeTypes'

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
