import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

export type SlideShow = {
  urlImage: string
  title: string
  urlToPage: string
}

type Props = {
  slides: SlideShow[]
  onSetSlideTitle: React.Dispatch<SetStateAction<{ name: string } | null>>
}

const properties = {
  prevArrow: (
    <button className='m-[20px] border-[0px]'>
      <FontAwesomeIcon className='text-[38px] text-white' icon={faCircleChevronLeft} />
    </button>
  ),
  nextArrow: (
    <button className='m-[20px] border-[0px]'>
      <FontAwesomeIcon className='text-[38px] text-white' icon={faCircleChevronRight} />
    </button>
  )
}

export default function SlideShowCustom({ slides, onSetSlideTitle }: Props) {
  const navigate = useNavigate()
  const handleViewPage = (url: string, title: string) => {
    if (url) {
      navigate(url)
    }
    onSetSlideTitle({ name: title })
  }

  return (
    <Slide {...properties}>
      {slides.map((slide, index) => (
        <div key={index} className='each-slide-effect h-[700px]'>
          <div
            className='flex items-center justify-center bg-cover h-[700px] relative'
            style={{ backgroundImage: `url(${slide.urlImage})` }}
          >
            <div className='w-6/12 absolute left-[5%] right-auto top-5 bottom-auto bg-black bg-opacity-60'>
              <div className='w-auto inline-block mt-5 mb-2.5 mx-0 p-[30px]'>
                <div data-animation='animated ScrollRight' className='text-[46px] opacity-100 text-white mb-0'>
                  {slide.title}
                </div>
                <div className='mt-8 py-2.5'>
                  <button
                    className='w-fit text-white leading-loose px-[25px] py-2.5 rounded-[5px]'
                    onClick={() => handleViewPage(slide.urlToPage, slide.title)}
                    style={{
                      textShadow: 'none',
                      background: '#0388B4',
                      outline: 'none'
                    }}
                  >
                    Xem (View)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slide>
  )
}