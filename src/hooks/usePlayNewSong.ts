import { useCallback } from 'react'
import { useMusicStore } from '../store/musicStore'

const usePlayNewSong = () => {
  const { setIsPlaying, setIsLoading, fetchSong } = useMusicStore()

  const playNewSong = useCallback(async ({ lib, id }) => {
    setIsLoading(true)
    setIsPlaying(false)

    try {
      await fetchSong({ lib, id })
      setIsPlaying(true)
    } catch (error) {
      console.error('Error fetching song:', error)
    } finally {
      setIsLoading(false)
    }
  }, [fetchSong, setIsLoading, setIsPlaying])
  return { playNewSong }
}

export default usePlayNewSong
