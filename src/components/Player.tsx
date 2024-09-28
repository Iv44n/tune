import { useEffect, useState, useRef, useCallback, type MutableRefObject } from 'react'
import { useMusicStore } from '../store/musicStore'
import {
  Loading,
  Pause,
  Play,
  PlayTrackNext,
  PlayTrackPrev
} from './PlayButtons'
import SongControl from './SongControl'
import usePlayNewSong from '../hooks/usePlayNewSong'
import MobilePlayer from './MobilePlayer'

export default function Player() {
  const [drop, setDrop] = useState(false)
  const { isPlaying, setIsPlaying, playingMusic, isLoading } = useMusicStore()
  const { playNewSong } = usePlayNewSong()

  const {
    cover = '',
    title = '',
    artist = '',
    audio = '',
    playlistLenght,
    typePlaylist
  } = playingMusic || {}

  const audioRef: MutableRefObject<HTMLAudioElement | null> = useRef(null)

  useEffect(() => {
    if (!audioRef.current) return

    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl || !audio) return

    if (audio !== audioEl.src) {
      audioEl.src = audio
    }

    isPlaying && audioEl.paused ? audioEl.play() : audioEl.pause()

    return () => {
      if (!audioEl.paused) {
        audioEl.pause()
        setIsPlaying(false)
      }
      audioEl.src = ''
    }
  }, [audio, audioRef])

  const handleClick = useCallback(() => setIsPlaying(!isPlaying), [setIsPlaying, isPlaying])

  const fetchNextSong = useCallback(async (offset: number) => {
    if (!playingMusic || !typePlaylist || !playlistLenght) return

    const returnId = () => {
      if (offset === -1) {
        return playingMusic.id === 1 ? playlistLenght : playingMusic.id - 1
      } else {
        return playingMusic.id === playlistLenght ? 1 : playingMusic.id + 1
      }
    }

    const id = returnId()
    await playNewSong({ lib: typePlaylist, id })

  }, [playNewSong, playingMusic, playlistLenght, typePlaylist])

  return (
    <footer
      className={`
            flex gap-4 fixed bottom-0 w-full md:px-10 bg-[#FFFFFF] shadow-2xl shadow-blue-950 justify-between items-center
            ${drop ? 'h-area flex-col p-0' : 'p-4'}`}
    >
      <MobilePlayer
        cover={cover}
        title={title}
        artist={artist}
        drop={drop}
        setDrop={setDrop}
      />
      <div
        className={`
                flex gap-5 items-center justify-between relative
                ${drop && 'flex-col px-5 w-full'}`}
      >
        <div
          className={`
                    text-4xl grid gap-4 place-content-center grid-flow-col w-fit
                    ${drop && 'pl-2 bottom-8 absolute z-50'}
                `}
        >
          <button onClick={() => fetchNextSong(-1)}>
            <PlayTrackPrev />
          </button>

          <button
            className='text-black cursor-pointer w-9 h-9'
            onClick={handleClick}
          >
            {isLoading ? <Loading /> : isPlaying ? <Play /> : <Pause />}
          </button>

          <button onClick={() => fetchNextSong(1)}>
            <PlayTrackNext />
          </button>

          <audio
            ref={audioRef}
            preload='auto'
            onEnded={() => fetchNextSong(1)}
          ></audio>
        </div>

        <div className={`md:flex gap-10 ${drop ? 'block w-full' : 'hidden'}`}>
          <SongControl audio={audioRef} drop={drop} />
        </div>
      </div>

      <button
        onClick={() => setDrop(!drop)}
        className={`md:hidden text-xl rounded-full h-5 w-5 flex text-white bg-blue-600 items-center absolute bottom-[70px] right-6 ${
          drop && 'hidden'
        }`}
      >
        <i className='ri-arrow-up-s-line'></i>
      </button>
    </footer>
  )
}
