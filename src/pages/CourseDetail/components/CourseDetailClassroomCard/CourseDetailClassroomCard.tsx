import DaysInWeekEnum from 'src/constants/daysInWeek'
import { Classroom } from 'src/types/classroom.type'

interface Props {
  classroom: Classroom
  canRegister?: boolean
}

export default function CourseDetailClassroomCard({ classroom, canRegister = false }: Props) {
  //! Get timetable
  const startTimestamp = new Date(classroom.time_table[0].lesson_start)
  const endTimestamp = new Date(classroom.time_table[0].lesson_end)

  const startTime = startTimestamp.getHours().toString() + ':' + startTimestamp.getMinutes().toString()
  const endTime = endTimestamp.getHours().toString() + ':' + endTimestamp.getMinutes().toString()
  const day = startTimestamp.getDay()

  return (
    <div className='bg-webColor100 rounded-md p-2 space-y-2'>
      <p className='uppercase font-medium text-lg text-center desktop:text-xl space-x-1.5'>
        <span className=''>Lớp</span>
        <span className=''>
          <span className=''>L</span>
          <span className=''>{1}</span>
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

      {canRegister && (
        <div className='w-full justify-center flex min-h-8'>
          <button className='flex bg-unhoverBg hover:bg-hoveringBg rounded-lg items-center justify-center py-2 px-4'>
            Đăng ký
          </button>
        </div>
      )}
    </div>
  )
}
