import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import { AdminContext } from 'src/contexts/admin.context'
import { Course } from 'src/types/course.type'
import { generateCourseId } from 'src/utils/course.utils'

interface Props {
  course: Course
}

export default function AdminCourseCard({ course }: Props) {
  const { setCurrentCourse } = useContext(AdminContext)

  const infos = [
    {
      title: 'Khóa học',
      content: course.course_name
    },
    {
      title: 'Số tín chỉ',
      content: course.credit
    },
    {
      title: 'Số lớp',
      content: course.limit
    }
  ]

  //! HANDLE ENTER ITEM
  const navigate = useNavigate()
  const handleClickItem = () => {
    setCurrentCourse(course)
    navigate({ pathname: `${adminPath.courses}/${generateCourseId({ course: course.course_name, id: course._id })}` })
  }

  return (
    <button
      onClick={handleClickItem}
      className='rounded-md w-full items-center justify-center p-4 space-y-4 bg-webColor100 hover:bg-webColor300'
    >
      <div className='space-y-2'>
        {infos.map((info, index) => (
          <div key={index} className='grid grid-cols-4 gap-2 text-left items-center'>
            <span className='col-span-1 opacity-70 text-sm'>{info.title}</span>
            <span className='col-span-3 '>{info.content}</span>
          </div>
        ))}
      </div>
    </button>
  )
}
