import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import classroomApi from 'src/apis/classroom.api'
import LoadingSection from 'src/components/LoadingSection'
import { AppContext } from 'src/contexts/app.context'
import { Course } from 'src/types/course.type'
import CourseDetailClassroomCard from '../../components/CourseDetailClassroomCard'
import authApi from 'src/apis/auth.api'

interface Props {
  course: Course
}

export interface ClassroomTimetable {
  course: string
  day: number
  startTime: number
  endTime: number
}

export default function CourseDetailClassroomList({ course }: Props) {
  const { isAuthenticated, profile } = useContext(AppContext)

  const today = new Date()
  const endDate = new Date(course.end_time)
  const inDate = today.getTime() <= endDate.getTime()

  const canRegister = isAuthenticated && inDate && profile?.role == 0

  //! Get classroom list
  const { data: classroomListData } = useQuery({
    queryKey: ['classroom_list_in_course', course._id],
    queryFn: () => classroomApi.getClassroomList({ course_id: course._id })
  })
  const classroomList = classroomListData?.data.data

  //! Get joined classroom list
  const { data: joinedClassroomListData } = useQuery({
    queryKey: ['joined_classroom_list', profile?._id],
    queryFn: () => authApi.getJoinedClassroomList(),
    enabled: isAuthenticated
  })
  const joinedClassroomList = joinedClassroomListData?.data.data || []
  const joinedClassroomIdList = joinedClassroomList.map((classroom) => classroom.class._id)
  const courseIsRegistered = joinedClassroomList.map((classroom) => classroom.course._id).includes(course._id)

  //! Get timetable of student
  const studentTimetable = joinedClassroomList.map((classroom) => {
    const startTimestamp = new Date(classroom.class.time_table[0].lesson_start)
    const endTimestamp = new Date(classroom.class.time_table[0].lesson_end)

    const timetable: ClassroomTimetable = {
      course: classroom.course.course_name,
      day: startTimestamp.getDay(),
      startTime: startTimestamp.getHours(),
      endTime: endTimestamp.getHours()
    }
    return timetable
  })

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
              <CourseDetailClassroomCard
                courseIsRegisterd={courseIsRegistered}
                classroom={clasroom}
                studentTimeTable={studentTimetable}
                canRegister={canRegister}
                joinedClassroomList={joinedClassroomIdList}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
