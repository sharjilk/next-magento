'use client'

import Image from 'next/image'
import { useState } from 'react'

type MediaProps = {
  uid: string
  disabled: boolean
  file: string
  label: string
  position: number
}

const Media = ({ media }: { media: MediaProps[] }) => {
  const mediaUrl = process.env.NEXT_PUBLIC_MAGENTO_MEDIA_URL
  const [currentImage, setCurrentImage] = useState(media[0].file)

  const handleThumbnailClick = (file: string) => {
    setCurrentImage(file)
  }

  return (
    <div className="flex">
      <div className="flex flex-col">
        {media.map((item) => (
          <div
            key={item.uid}
            className={`cursor-pointer mb-2 border-2 ${
              currentImage === item.file
                ? ' border-black'
                : 'border-transparent'
            }`}
            onClick={() => handleThumbnailClick(item.file)}
          >
            <Image
              src={`${mediaUrl}${item.file}`}
              alt={item.label}
              width={100}
              height={124}
            />
          </div>
        ))}
      </div>
      <div className="mr-4">
        <Image
          src={`${mediaUrl}${currentImage}`}
          width={600}
          height={745}
          sizes="(min-width: 1360px) 600px, (min-width: 780px) calc(46.61vw - 25px), (min-width: 640px) calc(28.33vw - 45px), calc(85.31vw - 82px)"
          alt={media[0].label}
          priority={true}
        />
      </div>
    </div>
  )
}

export default Media
