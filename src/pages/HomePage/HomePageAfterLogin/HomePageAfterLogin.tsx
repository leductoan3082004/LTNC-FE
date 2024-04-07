import SlideShowCustom, { SlideShow } from 'src/components/SlideShowCustom'
import NotificationsHomeLogged from './components/Notification'
import { notification } from './utils/test'
import mainPath, { personalPath } from 'src/constants/path'
import { useEffect, useRef, useState } from 'react'

const slides: SlideShow[] = [
  {
    urlImage: 'https://huongnghiep.hocmai.vn/wp-content/uploads/2022/02/image1-92.png',
    title: 'Trang hồ sơ',
    urlToPage: mainPath.personal
  },
  {
    urlImage: 'https://huongnghiep.hocmai.vn/wp-content/uploads/2022/02/image1-92.png',
    title: 'Trang tài khoản',
    urlToPage: personalPath.account
  },
  {
    urlImage: 'https://huongnghiep.hocmai.vn/wp-content/uploads/2022/02/image1-92.png',
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
    <div className='flex flex-col justify-between h-full shrink-0 '>
      <div className='w-full mx-auto max-w-1200 aspect-w-10 aspect-h-6'>
        <SlideShowCustom slides={slides} onSetSlideTitle={setSlideTitle} />
      </div>
      <div className='p-10 m-0 bg-white' ref={notificationRef}>
        <div className='max-w-[1140px] font-bold text-[34px] text-[#044CC8] mx-auto my-0 '>
          Thông báo chung
        </div>
        <div className='py-3'></div>
        <NotificationsHomeLogged notifications={notification} />
      </div>
    </div>
  )
}