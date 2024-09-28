import { create } from 'zustand'
import { initialSong } from '../lib/data'
import type { MusicStore } from '../types/storeTypes'

export const useMusicStore = create<MusicStore>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  playingMusic: initialSong,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  async fetchSong({ lib, id }) {
    set({ isLoading: true, isPlaying: false })

    try {
      const res = await fetch(`/api/songApi?lib=${lib}&id=${id}`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await res.json()
      set({ playingMusic: data, isPlaying: true })
    } catch (error) {
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  }
}))
