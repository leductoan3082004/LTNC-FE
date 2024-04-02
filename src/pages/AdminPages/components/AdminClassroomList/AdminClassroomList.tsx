import { useQuery } from '@tanstack/react-query'
import classroomApi from 'src/apis/classroom.api'
import LoadingSection from 'src/components/LoadingSection'
import DaysInWeekEnum from 'src/constants/daysInWeek'
import { Classromm } from 'src/types/classroom.type'
import { Course } from 'src/types/course.type'

interface Props {
  course: Course
}

function ClassroomCard({ classroom, index }: { classroom: Classromm; index: number }) {
  //! Get timetable
  const startTimestamp = new Date(classroom.time_table[0].lesson_start)
  const endTimestamp = new Date(classroom.time_table[0].lesson_end)

  const startTime = startTimestamp.getHours().toString() + ':' + startTimestamp.getMinutes().toString()
  const endTime = endTimestamp.getHours().toString() + ':' + endTimestamp.getMinutes().toString()
  const day = startTimestamp.getDay()

  return (
    <div className='bg-webColor100 rounded-md border border-black/20 py-2 px-3 space-y-3'>
      <p className='uppercase font-medium text-lg text-center desktop:text-xl space-x-1.5'>
        <span className=''>Lớp</span>
        <span className=''>
          <span className=''>L</span>
          <span className=''>{index}</span>
        </span>
      </p>
      <div className='flex space-x-1'>
        <span className='text-primaryText font-medium'>{startTime}</span>
        <span className=''>đến</span>
        <span className='text-primaryText font-medium'>{endTime}</span>
      </div>
      <div className='flex space-x-1'>
        <span className='text-primaryText font-medium'>{DaysInWeekEnum[day]}</span>
        <span className=''>các tuần</span>
      </div>

      <div className='flex space-x-2 items-center'>
        <span className='opacity-60'>Thành viên: </span>
        <span className='text-primaryText font-medium flex space-x-0.5 items-center'>
          <span>{classroom.members ? classroom.members.length : 0}</span>
          <span className='text-xl'>/</span>
          <span>{classroom.limit}</span>
        </span>
      </div>

      <div className='w-full flex justify-center'>
        <button className='bg-unhoverBg hover:bg-hoveringBg rounded-md py-1.5 px-3'>Đi tới lớp học</button>
      </div>
    </div>
  )
}

export default function AdminClassroomList({ course }: Props) {
  //! Get class list in a course
  const courseId = course._id
  const { data: classroomListData } = useQuery({
    queryKey: ['admin_classroom_list', courseId],
    queryFn: () => classroomApi.getClassroomList({ course_id: courseId })
  })
  const classroomList = classroomListData?.data.data

  return (
    <div className='p-4 rounded-lg border space-y-4 border-black/20 bg-webColor100'>
      <p className='uppercase text-primaryText font-bold text-xl desktop:tetx-3xl text-center'>
        Danh sách lớp học hiện tại
      </p>

      {!classroomList && <LoadingSection />}

      <div className='grid grid-cols-3 gap-4'>
        {classroomList &&
          classroomList.map((classroom, index) => (
            <div key={classroom._id} className='col-span-1'>
              <ClassroomCard classroom={classroom} index={index} />
            </div>
          ))}
      </div>
    </div>
  )
}
