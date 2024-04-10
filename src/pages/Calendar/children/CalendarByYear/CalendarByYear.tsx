import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import LoadingSection from 'src/components/LoadingSection'
import mainPath from 'src/constants/path'
import { CalendarContext } from 'src/contexts/calendar.context'

const boo = false
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


  const { data: joinedClassroomListData } = useQuery({
    queryKey: ['joined_classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList(),
  })
  const joinedClassroomList = joinedClassroomListData?.data.data || []

  const joinedClassroomListByYear = joinedClassroomList.filter((classroom) => {
    return new Date(classroom.course.start_time).getFullYear() == parseInt(academicYear)
  })



  const studentTimetable = joinedClassroomListByYear.map((classroom) => {
    console.log(classroom.class.time_table[0])
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
      <div className='py-2 flex justify-center items-center w-full text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '>
        {`Năm học: ${academicYear}`}
      </div>
      <div className='w-full flex justify-center'>
        <div className='border-t-2 border-primaryText w-6/12 desktop:w-4/12'></div>
      </div>
      <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
        {boo && <LoadingSection />}
        {!boo &&
          <div>
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
        }
      </div>
    </div>
  )
}
