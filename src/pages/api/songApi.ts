import { songsTop, songsPopular } from '../../lib/data'
import type { Song } from '../../types/dataMusic'
import type { APIRoute } from 'astro'
import { TYPE_PLAYLIST } from '../../consts/playlistType'

const searchSongById = (lib: string, id: number) => {
  if (lib === TYPE_PLAYLIST.SONGS_TOP) {
    return songsTop.find((song) => {
      return song.id === id
    })
  } else if (lib === TYPE_PLAYLIST.SONGS_POPULAR) {
    return songsPopular.find((song) => {
      return song.id === id
    })
  }
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const { url } = request
    const urlObj = new URL(url)
    const library = urlObj.searchParams.get('lib')
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

    const song: Song = searchSongById(library, id)

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
      status: 400,
      statusText: 'Internal Server Error'
    })
  }
}
