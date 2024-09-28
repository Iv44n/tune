import { useCallback } from 'react'
import { useMusicStore } from '../store/musicStore'
import type { PlaylistTypeValue } from '../types/dataMusic'

interface Props {
  lib: PlaylistTypeValue
  id: number
}

const usePlayNewSong = () => {
  const { fetchSong } = useMusicStore()

  const playNewSong = useCallback(async ({ lib, id }: Props) => {
    try {
      await fetchSong({ lib, id })
    } catch (error) {
      console.error('Error fetching song:', error)
    }
  }, [fetchSong])

  return { playNewSong }
}

export default usePlayNewSong
