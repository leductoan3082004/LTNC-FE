import SlideShowCustom, { SlideShow } from 'src/components/SlideShowCustom'
import NotificationsHomeLogged from './components/Notification'
import { notifications } from './utils/notifications'
import mainPath from 'src/constants/path'
import { useEffect, useRef, useState } from 'react'

const slides: SlideShow[] = [
  {
    urlImage:
      'https://vcdn1-vnexpress.vnecdn.net/2022/09/15/-4772-1663217379.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=BCGz6Qss-61UM6NuBhtQCg',
    title: 'Trang hồ sơ',
    urlToPage: mainPath.personal
  },
  {
    urlImage: 'https://huongnghiepcdm.edu.vn/files/upload/images/bachkhoa-1577528142-7139-1577528151.jpg',
    title: 'Trang khóa học',
    urlToPage: mainPath.courseList
  },
  {
    urlImage:
      'https://lh5.googleusercontent.com/iw1LrpIRx7eXMfRpzyLOgxsEocfO85zG6YVtlwcxs6AhsIm5EZpw0Bt9G7vxtdrqU1SCqkt16SudSRb4f_7VQbaHBzUwb7ijqzlPGzBEuOI51hnDzk-mR6sRm2cf4hi7UFHNlXpL',
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
