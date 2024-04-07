import { useNavigate } from 'react-router-dom'
import DaysInWeekEnum from 'src/constants/daysInWeek'
import { adminPath } from 'src/constants/path'
import { Classroom } from 'src/types/classroom.type'
import { Course } from 'src/types/course.type'
import { generateClassroomId, generateClassroomName } from 'src/utils/classroom.utils'

interface Props {
  classroom: Classroom
  course?: Course
}

export default function AdminClassroomCard({ classroom, course }: Props) {
  //! Get timetable
  const startTimestamp = new Date(classroom.time_table[0].lesson_start)
  const endTimestamp = new Date(classroom.time_table[0].lesson_end)

  const startTime = startTimestamp.getHours().toString() + ':' + startTimestamp.getMinutes().toString()
  const endTime = endTimestamp.getHours().toString() + ':' + endTimestamp.getMinutes().toString()
  const day = startTimestamp.getDay()

  //! Handle enter classroom
  const navigate = useNavigate()
  const handleClick = () => {
    navigate({ pathname: `${adminPath.classrooms}/${generateClassroomId({ id: classroom._id })}` })
  }

  //! Get student quantity
  const memberList = classroom.members ? classroom.members : []
  const studentList = memberList.filter((member) => {
    return member.role == 0
  })

  return (
    <div className='bg-webColor100 rounded-md border border-black/20 py-2 px-3 space-y-3'>
      <p className='uppercase font-medium text-lg text-center desktop:text-xl space-x-1.5'>
        <span className=''>Lớp</span>
        <span className=''>{generateClassroomName(classroom._id)}</span>
      </p>

      {course && (
        <div className='flex space-x-2 items-center'>
          <span className='opacity-60'>Khóa học: </span>
          <span className='text-primaryText font-medium flex space-x-0.5 items-center'>{course.course_name}</span>
        </div>
      )}

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
          <span>{studentList.length}</span>
          <span className='text-xl'>/</span>
          <span>{classroom.limit + studentList.length}</span>
        </span>
      </div>

      <div className='w-full flex justify-center'>
        <button onClick={handleClick} className='bg-unhoverBg hover:bg-hoveringBg rounded-md py-1.5 px-3'>
          Đi tới lớp học
        </button>
      </div>
    </div>
  )
}
