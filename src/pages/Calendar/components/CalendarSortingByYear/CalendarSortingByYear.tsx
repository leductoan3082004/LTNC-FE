import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import DaysInWeekEnum from 'src/constants/daysInWeek'
import mainPath from 'src/constants/path'
import { CalendarContext } from 'src/contexts/calendar.context'

interface Props {
  year: number
}
export interface ClassroomTimetable {
  course: string
  day: string
  startTime: number
  endTime: number
}
export default function CalendarSortingByYear({ year }: Props) {
  const { setAcademicYear } = useContext(CalendarContext)

  const navigate = useNavigate()
  //! HANDLE CHOOSE YEAR
  const handleSelectYear = () => {
    setAcademicYear(year.toString())
    navigate({ pathname: `${mainPath.calendar}/${year}` })
  }

  const { data: joinedClassroomListData } = useQuery({
    queryKey: ['joined_classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList()
  })
  const joinedClassroomList = joinedClassroomListData?.data.data || []

  const joinedClassroomListByYear = joinedClassroomList.filter((classroom) => {
    return new Date(classroom.course.start_time).getFullYear() == year
  })

  const studentTimetable = joinedClassroomListByYear.map((classroom) => {
    const startTimestamp = new Date(classroom.class.time_table[0].lesson_start)
    const endTimestamp = new Date(classroom.class.time_table[0].lesson_end)

    const timetable: ClassroomTimetable = {
      course: classroom.course.course_name,
      day: DaysInWeekEnum[startTimestamp.getDay()],
      startTime: startTimestamp.getHours(),
      endTime: endTimestamp.getHours()
    }
    return timetable
  })

  //! Styles
  const cellStyle = 'py-2 flex items-center justify-center border border-black/40'

  return (
    <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
      <button
        onClick={handleSelectYear}
        className='py-2 flex justify-center items-center w-full hover:text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '
      >
        {`Năm học: ${year}`}
      </button>
      <div className='w-full flex justify-center'>
        <div className='border-t-2 border-primaryText w-6/12 desktop:w-4/12'></div>
      </div>
      <div className='w-full border border-black/40'>
        <div className='w-full text-lg desktop:text-xl font-semibold uppercase bg-webColor300 grid grid-cols-12'>
          <div className={classNames(cellStyle, 'col-span-2')}>Mã MH</div>
          <div className={classNames(cellStyle, 'col-span-4')}>Tên môn học</div>
          <div className={classNames(cellStyle, 'col-span-3')}>Ngày Học</div>
          <div className={classNames(cellStyle, 'col-span-3')}>Giờ học</div>
          <div className=''></div>
        </div>
        {studentTimetable.map((time, index) => (
          <div key={index} className='w-full grid font-medium grid-cols-12 desktop:text-lg'>
            <div className={classNames(cellStyle, 'col-span-2 text-lg')}>{index + 1}</div>
            <div className={classNames(cellStyle, 'col-span-4 ')}>{time.course}</div>
            <div className={classNames(cellStyle, 'col-span-3 ')}>{time.day}</div>
            <div className={classNames(cellStyle, 'col-span-3 ')}>
              {time.startTime}h - {time.endTime}h
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
