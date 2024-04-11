import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import LoadingSection from 'src/components/LoadingSection'
import DaysInWeekEnum from 'src/constants/daysInWeek'
import mainPath from 'src/constants/path'
import { CalendarContext } from 'src/contexts/calendar.context'

export interface ClassroomTimetable {
  course: string
  day: string
  startTime: number
  endTime: number
}
export default function CalendarByYear() {
  const { academicYear, setCalendarPath, setAcademicYear } = useContext(CalendarContext)

  const pathName = useLocation().pathname
  const arr = pathName.split('/')
  const year = arr[arr.length - 1]
  useEffect(() => {
    if (academicYear == '') {
      setAcademicYear(year)
    }
  }, [academicYear, setAcademicYear, year])

  //! SET PATH LIST
  useEffect(() => {
    setCalendarPath([
      { pathName: 'Thời Khóa biểu', url: mainPath.calendar },
      { pathName: `Năm học ${academicYear}`, url: `${mainPath.calendar}/${academicYear}` }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [academicYear])

  const { data: joinedClassroomListData, isFetched } = useQuery({
    queryKey: ['joined_classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList()
  })
  const joinedClassroomList = joinedClassroomListData?.data.data || []

  const joinedClassroomListByYear = joinedClassroomList.filter((classroom) => {
    return new Date(classroom.course.start_time).getFullYear() == parseInt(academicYear)
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
      <div className='py-2 flex justify-center items-center w-full text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '>
        {`Năm học: ${academicYear}`}
      </div>
      <div className='w-full flex justify-center'>
        <div className='border-t-2 border-primaryText w-6/12 desktop:w-4/12'></div>
      </div>
      <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
        {!isFetched && <LoadingSection />}
        {isFetched && (
          <div className='w-full border border-black/40'>
            <div className='w-full text-lg desktop:text-xl font-semibold uppercase bg-webColor300 grid grid-cols-12'>
              <div className={classNames(cellStyle, 'col-span-2')}>Mã MH</div>
              <div className={classNames(cellStyle, 'col-span-4')}>Tên môn học</div>
              <div className={classNames(cellStyle, 'col-span-3')}>Ngày Học</div>
              <div className={classNames(cellStyle, 'col-span-3')}>Giờ học</div>
              <div className=''></div>
            </div>
            {studentTimetable.map((time, index) => (
              <div key={index} className='w-full font-medium grid grid-cols-12 desktop:text-lg'>
                <div className={classNames(cellStyle, 'col-span-2 text-lg')}>{index + 1}</div>
                <div className={classNames(cellStyle, 'col-span-4 ')}>{time.course}</div>
                <div className={classNames(cellStyle, 'col-span-3 ')}>{time.day}</div>
                <div className={classNames(cellStyle, 'col-span-3 ')}>
                  {time.startTime}h - {time.endTime}h
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
