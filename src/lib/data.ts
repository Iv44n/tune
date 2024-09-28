import type { Song, Albums, AllSongs } from '../types/dataMusic'
import { TYPE_PLAYLIST } from '../consts/playlistType'
import type { PlayingMusic } from '../types/storeTypes'

export const albums: Albums[] = [
  {
    id: 1,
    title: 'Kiss Land',
    cover: '/IMGS/ALBUMS/01.webp',
    artist: 'The Weeknd',
    year: 2013,
    songNumber: 10
  },
  {
    id: 2,
    title: 'Donda',
    cover: '/IMGS/ALBUMS/02.webp',
    artist: 'Kanye West',
    year: 2021,
    songNumber: 27
  },
  {
    id: 3,
    title: 'DAMN',
    cover: '/IMGS/ALBUMS/03.webp',
    artist: 'Kendrick Lamar',
    year: 2017,
    songNumber: 14
  },
  {
    id: 4,
    title: 'Certified Lover Boy',
    cover: '/IMGS/ALBUMS/04.webp',
    artist: 'Drake',
    year: 2021,
    songNumber: 21
  },
  {
    id: 5,
    title: 'More Life',
    cover: '/IMGS/ALBUMS/05.webp',
    artist: 'Drake',
    year: 2017,
    songNumber: 22
  }
]

export const Allsong: AllSongs[] = [
  {
    cover: '/IMGS/SONGS/01.webp',
    title: 'In Slow Motion',
    artist: 'Soundbay',
    audio: '/MUSIC/01.mp3',
    isTop: true,
    isPopular: false
  },
  {
    cover: '/IMGS/SONGS/02.webp',
    title: 'AMALGAM',
    artist: 'Rockot',
    audio: '/MUSIC/02.mp3',
    isTop: true,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/03.webp',
    title: 'No Place To Go',
    artist: 'SergePavkinMusic',
    audio: '/MUSIC/03.mp3',
    isTop: false,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/04.webp',
    title: 'Flow',
    artist: 'Loksii',
    audio: '/MUSIC/04.mp3',
    isTop: false,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/05.webp',
    title: 'Summel Travel',
    artist: 'Lidérc',
    audio: '/MUSIC/05.mp3',
    isTop: false,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/06.webp',
    title: 'Movement',
    artist: 'SoulProdMusic',
    audio: '/MUSIC/06.mp3',
    isTop: true,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/07.webp',
    title: 'Ethereal Vistal',
    artist: 'Denys Brodovskyi',
    audio: '/MUSIC/07.mp3',
    isTop: true,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/08.webp',
    title: 'Perfect Beauty',
    artist: 'Good B Music',
    audio: '/MUSIC/08.mp3',
    isTop: true,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/09.webp',
    title: 'Better Day',
    artist: 'Penguin Music',
    audio: '/MUSIC/09.mp3',
    isTop: false,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/10.webp',
    title: 'Chasing a Feeling',
    artist: 'Alex Grohl',
    audio: '/MUSIC/10.mp3',
    isTop: false,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/11.webp',
    title: 'Separation',
    artist: 'William King',
    audio: '/MUSIC/11.mp3',
    isTop: false,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/12.webp',
    title: 'Midnight Forest',
    artist: 'Syouki Takahashi',
    audio: '/MUSIC/12.mp3',
    isTop: false,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/13.webp',
    title: 'Titanium',
    artist: 'Alisia Beats',
    audio: '/MUSIC/13.mp3',
    isTop: false,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/14.webp',
    title: 'Smoke',
    artist: 'SoulProdMusic',
    audio: '/MUSIC/14.mp3',
    isTop: true,
    isPopular: true
  },
  {
    cover: '/IMGS/SONGS/15.webp',
    title: 'Password Infinity',
    artist: 'Evgeny Bardyuzha',
    audio: '/MUSIC/15.mp3',
    isTop: false,
    isPopular: true
  }
]

let indexCounter = 0

export const songsTop: Song[] = Allsong.filter((song) => song.isTop).map(
  (song) => ({
    id: ++indexCounter,
    typePlaylist: TYPE_PLAYLIST.SONGS_TOP,
    cover: song.cover,
    title: song.title,
    artist: song.artist,
    audio: song.audio
  })
)

indexCounter = 0 // Reinicia el contador

export const songsPopular: Song[] = Allsong.filter(
  (song) => song.isPopular
).map((song) => ({
  id: ++indexCounter,
  typePlaylist: TYPE_PLAYLIST.SONGS_POPULAR,
  cover: song.cover,
  title: song.title,
  artist: song.artist,
  audio: song.audio
}))

export const initialSong: PlayingMusic = {
  id: 1,
  typePlaylist: TYPE_PLAYLIST.SONGS_TOP,
  cover: songsTop[0].cover,
  title: songsTop[0].title,
  artist: songsTop[0].artist,
  audio: songsTop[0].audio,
  playlistLenght: songsTop.length
}
