import type { TYPE_PLAYLIST } from '../consts/playlistType'

export interface SongBase {
  cover: string;
  title: string;
  artist: string;
  audio: string;
}

export type PlaylistTypeValue = typeof TYPE_PLAYLIST[keyof typeof TYPE_PLAYLIST]

export interface Song extends SongBase {
  id: number;
  typePlaylist?: PlaylistTypeValue;
}

export interface AllSongs extends SongBase {
  isTop?: boolean;
  isPopular?: boolean;
}

export interface Albums {
  id: number;
  title: string;
  cover: string;
  artist: string;
  year: number;
  songNumber: number;
}
