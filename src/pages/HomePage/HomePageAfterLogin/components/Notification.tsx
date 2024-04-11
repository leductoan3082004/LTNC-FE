import { useState } from 'react'

export type Notification = {
  title: string
  time: string
  content: string
}
type Props = {
  notifications: Notification[]
}

const borderStyle = {
  nonActive: 'border border-solid border-black/40',
  active: 'border border-solid border-black'
}

export default function NotificationsHomeLogged({ notifications }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index)
  }

  return (
    <div className='space-y-4'>
      {notifications.map((item, index) => (
        <button
          className={`${selectedIndex === index ? borderStyle.active : borderStyle.nonActive} box-border rounded-xl p-6 mb-2 relative w-full`}
          onClick={() => handleClick(index)}
          key={index}
        >
          <div className='flex items-center'>
            <div className='mr-2 w-[45px]'>
              <img
                className='rounded-circle w-100 rounded-[50%]'
                src='https://lms.hcmut.edu.vn/theme/image.php/academi/core/1712311766/u/f1'
                alt='Picture of the Training Department'
                aria-hidden='true'
                title='Picture of the Training Department'
              />
            </div>
            <div>
              <div className='text-left font-bold text-[0.9375rem] text-[#044CC8] mb-0 pt-2.5 leading-normal'>
                {item.title}
              </div>
              <div className='mb-3'>
                Bởi <span className='text-[#0388B4] no-underline bg-transparent leading-normal'>Phòng Đào Tạo</span> -{' '}
                <time className='leading-normal' dateTime='2024-01-03T15:12:46+07:00'>
                  {item.time}
                </time>
              </div>
            </div>
          </div>
          <div className='w-[60%] leading-normal mt-4 text-left'>{item.content}</div>
        </button>
      ))}
    </div>
  )
}
