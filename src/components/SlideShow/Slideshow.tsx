import { useState } from 'react'
//import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react"
import { faArrowLeft, faArrowRight, faCircleDot, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ImageSliderProps = {
  images: {
    url: string
    alt: string
  }[]
}

export function SlideShow({ images }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0)

  function showNextImage() {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0
      return index + 1
    })
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1
      return index - 1
    })
  }

  return (
    <section aria-label='Image Slider' style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* <a
        href='#after-image-slider-controls'
        className='absolute w-1 h-1 p-0 m--1 overflow-hidden border-0 clip-rect(0, 0, 0, 0)
        top-0 left-0 border-1 border-solid border-black bg-white p-2 w-auto h-auto m-0
        clip-unset text-decoration-none text-black z-100'
      ></a> */}
      <div className='w-full h-full flex overflow-hidden'>
        {images.map(({ url, alt }, index) => (
          <img
            key={url}
            src={url}
            alt={alt}
            aria-hidden={imageIndex !== index}
            className='object-cover w-full h-full block flex-shrink-0 flex-grow-0'
            style={{ translate: `${-100 * imageIndex}%` }}
          />
        ))}
      </div>

      <button
        onClick={showPrevImage}
        className='items-center text-2xl px-4 bg-gradient-to-r from-sky-950 font-bold text-lightText absolute top-0 bottom-0 p-4 cursor-pointer transition-bg duration-100 ease-in-out left-0 '
        aria-label='View Previous Image'
      >
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className='items-center text-2xl px-4 bg-gradient-to-r from-sky-950 font-bold text-lightText absolute top-0 bottom-0 p-4 cursor-pointer transition-bg duration-100 ease-in-out right-0'
        aria-label='View Next Image'
      >
        <FontAwesomeIcon icon={faArrowRight} aria-hidden />
      </button>

      <div className='items-center text-1xl rounded-full bg-darkText font-bold text-lightText absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-1/4'>
        {images.map((_, index) => (
          <button
            key={index}
            className='unset block cursor-pointer transition-transform duration-100 ease-in-out transform scale-150 text-white fill-black w-full h-full visible'
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <FontAwesomeIcon icon={faCircleDot} aria-hidden />
            ) : (
              <FontAwesomeIcon icon={faCircle} aria-hidden />
            )}
          </button>
        ))}
      </div>
      <div id='after-image-slider-controls' />
    </section>
  )
}
