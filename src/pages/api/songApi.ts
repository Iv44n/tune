import { songsTop, songsPopular } from '../../lib/data'
import type { PlaylistTypeValue, Song } from '../../types/dataMusic'
import type { APIRoute } from 'astro'
import { TYPE_PLAYLIST } from '../../consts/playlistType'

const searchSongById = ({ lib, id }: { lib: PlaylistTypeValue; id: number }) => {
  switch (lib) {
  case TYPE_PLAYLIST.SONGS_TOP:
    return songsTop.find((song) => song.id === id)
  case TYPE_PLAYLIST.SONGS_POPULAR:
    return songsPopular.find((song) => song.id === id)
  default:
    return undefined
  }
}

export const GET: APIRoute = ({ request }) => {
  try {
    const { url } = request
    const urlObj = new URL(url)
    const library = urlObj.searchParams.get('lib') as PlaylistTypeValue
    const id = Number(urlObj.searchParams.get('id'))

    if (library !== TYPE_PLAYLIST.SONGS_TOP && library !== TYPE_PLAYLIST.SONGS_POPULAR) {
      return new Response(
        JSON.stringify({ error: 'Library not found' }),
        {
          status: 404,
          statusText: 'Not Found Library'
        }
      )
    }

    const playlistLenght = library === TYPE_PLAYLIST.SONGS_TOP ? songsTop.length : songsPopular.length

    const song: Song | undefined = searchSongById({ lib: library, id })

    if (!song) {
      return new Response(JSON.stringify({ error: 'Song not found' }), {
        status: 404,
        statusText: 'Not Found Song'
      })
    }

    return new Response(JSON.stringify({ ...song, playlistLenght }), {
      status: 200,
      statusText: 'OK'
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      statusText: 'Internal Server Error'
    })
  }
}
