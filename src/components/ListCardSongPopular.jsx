import { useState } from 'react'
import CardSongPopular from './CardSongPopular.jsx'

export default function ListCardSongPopular({ songsPopular }) {
  const [showMore, setShowMore] = useState(5)

  const handleShowMore = () => {
    setShowMore((prevSongs) => prevSongs + 5)
  }

  return (
    <>
      {songsPopular.slice(0, showMore).map((song) => (
        <CardSongPopular key={song.id} {...song} />
      ))}

      <span className='w-full flex justify-center'>
        <button
          onClick={handleShowMore}
          className='text-2xl w-9 h-9 font-medium grid place-content-center hover:text-blue-600 hover:scale-125 transition duration-300 rounded-full'
        >
          <i className='ri-arrow-down-s-line'></i>
        </button>
      </span>
    </>
  )
}
