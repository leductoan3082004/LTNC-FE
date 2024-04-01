import DOMPurify from 'dompurify'
import { Course } from 'src/types/course.type'
import { formatDate } from 'src/utils/utils'

interface Props {
  course: Course
}

interface InfoItem {
  title: string
  content: string | number
}

export default function AdminCourseInfo({ course }: Props) {
  const infos: InfoItem[] = [
    { title: 'Ngày tạo', content: formatDate(course.created_at) },
    { title: 'Ngày cập nhật', content: formatDate(course.updated_at) },
    { title: 'Số tín chỉ', content: course.credit },
    { title: 'Số lớp tối đa', content: course.limit },
    { title: 'Ngày mở đăng ký', content: formatDate(new Date(course.start_time).toJSON()) },
    { title: 'Ngày đóng đăng ký', content: formatDate(new Date(course.end_time).toJSON()) },
    { title: 'Tỉ lệ điểm CHUYÊN CẦN', content: course.attendance_ratio },
    { title: 'Tỉ lệ điểm LAB', content: course.lab_ratio },
    { title: 'Tỉ lệ điểm GIỮA KỲ', content: course.midterm_ratio },
    { title: 'Tỉ lệ điểm CUỐI KỲ', content: course.final_ratio }
  ]

  return (
    <div className='w-full space-y-8 p-4 rounded-lg border border-black/20 bg-webColor100'>
      <p className='w-full text-center tracking-widest font-bold uppercase text-xl desktop:text-3xl text-primaryText'>
        {course?.course_name}
      </p>
      <div className='space-y-4'>
        {infos.map((info, index) => (
          <div key={index} className='grid items-center grid-cols-3 gap-4'>
            <p className='col-span-1 uppercase text-right opacity-60'>{info.title}</p>
            <p className='col-span-2 font-medium'>{info.content}</p>
          </div>
        ))}
      </div>
      <div className='space-y-4 justify-center'>
        <p className='font-medium uppercase text-center text-primaryText'>Mô tả khóa học</p>
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
