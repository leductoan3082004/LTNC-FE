import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
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
    queryFn: () => authApi.getJoinedClassroomList(),
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
      day: `${startTimestamp.getDate()}/${startTimestamp.getMonth() + 1}/${startTimestamp.getFullYear()}`,
      startTime: startTimestamp.getHours(),
      endTime: endTimestamp.getHours()
    }
    return timetable
  })



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
      <div className='overflow-x-auto'>
        <table className='table-auto w-full text-lg desktop:text-xl  text-darkText text-start'>
          <thead>
            <tr>
              <th className='px-4 py-2 uppercase'>Mã MH</th>
              <th className='px-4 py-2 uppercase'>Tên môn học</th>
              <th className='px-4 py-2 uppercase'>Ngày Học</th>
              <th className='px-4 py-2 uppercase'>Giờ học</th>
            </tr>
          </thead>
          <tbody>
            {studentTimetable.map((time, index) => (
              <tr key={index}>
                <td className='border border-black px-4 py-2 text-center text-lg'>{index + 1}</td>
                <td className='border border-black px-4 py-2 text-center '>{time.course}</td>
                <td className='border border-black px-4 py-2 text-center '>{time.day}</td>
                <td className='border border-black px-4 py-2 text-center'>{time.startTime}h - {time.endTime}h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
