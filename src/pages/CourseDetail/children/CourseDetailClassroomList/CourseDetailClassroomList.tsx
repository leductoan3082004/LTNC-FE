import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import classroomApi from 'src/apis/classroom.api'
import LoadingSection from 'src/components/LoadingSection'
import { AppContext } from 'src/contexts/app.context'
import { Course } from 'src/types/course.type'
import CourseDetailClassroomCard from '../../components/CourseDetailClassroomCard'

interface Props {
  course: Course
}

export default function CourseDetailClassroomList({ course }: Props) {
  const { isAuthenticated } = useContext(AppContext)

  const today = new Date()
  const endDate = new Date(course.end_time)
  const inDate = today.getTime() <= endDate.getTime()

  const canRegister = isAuthenticated && inDate

  //! Get classroom list
  const { data: classroomListData } = useQuery({
    queryKey: ['classroom_list_in_course', course._id],
    queryFn: () => classroomApi.getClassroomList({ course_id: course._id })
  })
  const classroomList = classroomListData?.data.data

  return (
    <div className='border p-4 border-black/40 rounded-lg sticky top-16 desktop:top-20 space-y-4'>
      <p className='w-full text-center text-primaryText font-semibold uppercase text-lg desktop:text-xl'>
        Danh sách lớp học
      </p>
      {!isAuthenticated && inDate && (
        <p className='text-center desktop:text-lg text-alertRed uppercase font-medium'>
          Bạn cần đăng nhập để có thể đăng ký lớp học
        </p>
      )}
      {!classroomList && <LoadingSection />}
      {classroomList && (
        <div className='grid grid-cols-1 desktop:grid-cols-2 gap-4'>
          {classroomList.map((clasroom) => (
            <div key={clasroom._id} className='col-span-1'>
              <CourseDetailClassroomCard classroom={clasroom} canRegister={canRegister} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
