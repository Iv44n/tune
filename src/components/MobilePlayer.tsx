import { useState } from 'react'

interface MobilePlayerProps {
  cover: string
  title: string
  artist: string
  drop: boolean
  setDrop: (drop: boolean) => void
}

export default function MobilePlayer({ cover, title, artist, drop, setDrop }: MobilePlayerProps) {
  const [like, setLike] = useState(false)
  const classIconHeart = like ? 'fill text-red-600' : 'line'

  return (
    <>
      {!drop ? (
        <div className='flex items-center gap-2 w-[250px]'>
          <img
            src={cover}
            alt={`${title} - ${artist} - Image`}
            className='rounded-full w-12 h-12  md:w-14 md:h-14'
            loading='lazy'
          />
          <div className='flex-1 overflow-hidden max-w-[200px]'>
            <h3 className='text-base font-semibold truncate ... overflow-hidden'>
              {title}
            </h3>
            <p className='text-zinc-500 text-sm truncate ... overflow-hidden'>
              {artist}
            </p>
          </div>
        </div>
      ) : (
        <article className='w-full h-full relative'>
          <div className='bg-cover bg-center bg-no-repeat h-[85%]'>
            <img
              src={cover}
              alt={`${title} - ${artist} - Image`}
              className='w-full h-full object-cover'
              loading='lazy'
              style={{
                maskImage: 'linear-gradient(black 90%, transparent)'
              }}
            />
            <button
              className='absolute top-2 left-4 text-3xl font-medium grid place-content-center text-gray-200 pt-3 transition duration-300 rounded-full'
              onClick={() => setDrop(!drop)}
            >
              <i className='ri-arrow-left-s-line'></i>
            </button>
          </div>

          <div className='w-full flex justify-between items-center px-5 my-5 relative'>
            <div className='max-w-[50%]'>
              <h3 className='text-xl font-semibold truncate ... overflow-hidden'>
                {title}
              </h3>
              <p className='text-zinc-500 truncate ... overflow-hidden'>
                {artist}
              </p>
            </div>
            <div onClick={() => setLike(!like)} className='text-3xl'>
              <i className={`ri-heart-2-${classIconHeart}`}></i>
            </div>
          </div>
        </article>
      )}
    </>
  )
}
