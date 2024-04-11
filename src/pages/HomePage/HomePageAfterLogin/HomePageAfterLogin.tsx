import SlideShowCustom, { SlideShow } from 'src/components/SlideShowCustom'
import NotificationsHomeLogged from './components/Notification'
import { notifications } from './utils/notifications'
import mainPath from 'src/constants/path'
import { useEffect, useRef, useState } from 'react'

const slides: SlideShow[] = [
  {
    urlImage: '/images/Slide_1.jpg',
    title: 'Trang hồ sơ',
    urlToPage: mainPath.personal
  },
  {
    urlImage: '/images/Slide_2.jpg',
    title: 'Trang khóa học',
    urlToPage: mainPath.courseList
  },
  {
    urlImage: '/images/Slide_3.png',
    title: 'Trang thông báo',
    urlToPage: ''
  }
]

export default function HomePageAfterLogin() {
  const notificationRef = useRef<HTMLDivElement | null>(null)
  const [slideTitle, setSlideTitle] = useState<{ name: string } | null>(null)

  useEffect(() => {
    if (notificationRef?.current && slideTitle?.name === slides[2].title) {
      const offset = 80
      window.scrollTo({
        top: notificationRef.current.offsetTop - offset,
        behavior: 'smooth'
      })
    }
  }, [slideTitle])

  return (
    <div className='h-full shrink-0 '>
      <div className='w-full mx-auto max-w-1200 aspect-w-10 aspect-h-6'>
        <SlideShowCustom slides={slides} onSetSlideTitle={setSlideTitle} />
      </div>
      <div className='p-10 m-0 bg-white space-y-8' ref={notificationRef}>
        <div className='max-w-[1140px] font-bold text-[34px] text-[#044CC8] mx-auto my-0 '>Thông báo chung</div>
        <div className='flex flex-col'>
          <NotificationsHomeLogged notifications={notifications} />
        </div>
      </div>
    </div>
  )
}
