import { useContext } from 'react'
import { CourseContext } from 'src/contexts/course.context'
import DOMPurify from 'dompurify'
import { Course } from 'src/types/course.type'
import { formatDate } from 'src/utils/utils'

interface Props {
  course: Course
}

interface Info {
  title: string
  content: string | number
}

export default function CourseDescription({ course }: Props) {
  const { academicYear } = useContext(CourseContext)

  const today = new Date()
  const endDate = new Date(course.end_time)
  const outOfDate = today.getTime() > endDate.getTime()

  const infos: Info[] = [
    {
      title: 'Năm học',
      content: academicYear
    },

    {
      title: 'Số tín chỉ',
      content: course.credit
    },
    {
      title: 'Tỉ lệ điểm chuyên cần',
      content: course.attendance_ratio
    },
    {
      title: 'Tỉ lệ điểm lab',
      content: course.lab_ratio
    },
    {
      title: 'Tỉ lệ điểm giữa kỳ',
      content: course.midterm_ratio
    },
    {
      title: 'Tỉ lệ điểm cuối kỳ',
      content: course.final_ratio
    }
  ]

  return (
    <div className='space-y-8 h-[2000px]'>
      <p className='font-bold uppercase text-xl desktop:text-3xl text-primaryText w-full text-center tracking-widest'>
        {course.course_name}
      </p>
      <div className='space-y-4 '>
        {infos.map((info, index) => (
          <div key={index} className='grid grid-cols-3 gap-2 desktop:text-lg'>
            <span className='col-span-1 opacity-60'>{info.title}</span>
            <span className='text-primaryText col-span-2 font-medium'>{info.content}</span>
          </div>
        ))}

        <div className='space-y-2'>
          <div className='grid grid-cols-3 gap-2 desktop:text-lg'>
            <span className='opacity-60 col-span-1'>Thời gian đăng ký: </span>
            <div className='col-span-2 flex space-x-1 desktop:space-x-1.5'>
              <span className=''>Từ</span>
              <span className='text-primaryText font-medium'>{formatDate(course.start_time)}</span>
              <span className=''>đến</span>
              <span className='text-primaryText font-medium'>{formatDate(course.end_time)}</span>
            </div>
          </div>
          {outOfDate && (
            <p className='text-alertRed uppercase font-medium desktop:text-lg'>Đã hết thời gian đăng ký môn học này</p>
          )}
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(course.description)
          }}
          className='overflow-visible'
        />
      </div>
    </div>
  )
}
