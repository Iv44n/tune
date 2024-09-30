import { songsTop, songsPopular } from '../../lib/data'
import type { PlaylistTypeValue, Song } from '../../types/dataMusic'
import type { APIRoute } from 'astro'
import { TYPE_PLAYLIST } from '../../consts/playlistType'

const searchSongById = ({ lib, id }: { lib: PlaylistTypeValue; id: number }) : Song | undefined => {
  const playlist = lib === TYPE_PLAYLIST.SONGS_TOP ? songsTop : songsPopular
  return playlist.find((song) => song.id === id)
}

const getParamsFromUrl = (url: string): { lib: PlaylistTypeValue; id: number } | null => {
  const urlObj = new URL(url)
  const lib = urlObj.searchParams.get('lib') as PlaylistTypeValue
  const id = Number(urlObj.searchParams.get('id'))

  if (!lib || isNaN(id)) return null
  if(![TYPE_PLAYLIST.SONGS_TOP, TYPE_PLAYLIST.SONGS_POPULAR].includes(lib)) {
    throw new Error('Library not found')
  }

  return { lib, id }
}

export const GET: APIRoute = ({ request }) => {
  try {
    const params = getParamsFromUrl(request.url)

    if (!params) {
      return new Response(
        JSON.stringify({ error: 'Invalid parameters' }),
        {
          status: 400,
          statusText: 'Bad Request'
        }
      )
    }

    const { lib, id } = params

    const song: Song | undefined = searchSongById({ lib, id })
    const playlistLenght = lib === TYPE_PLAYLIST.SONGS_TOP ? songsTop.length : songsPopular.length

    if (!song) {
      return new Response(JSON.stringify({ error: 'Song not found' }), {
        status: 404,
        statusText: 'Not Found'
      })
    }

    return new Response(JSON.stringify({ ...song, playlistLenght }), {
      status: 200,
      statusText: 'OK'
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      statusText: 'Internal Server Error'
    })
  }
}
