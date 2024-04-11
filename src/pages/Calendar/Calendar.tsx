import { useContext, useEffect } from 'react'
import { CalendarContext } from 'src/contexts/calendar.context'
import mainPath from 'src/constants/path'
import CalendarSortingByYear from './components/CalendarSortingByYear'
import { reversedAcademicYears } from 'src/constants/academicYears'

export default function Calendar() {
  const { setCalendarPath } = useContext(CalendarContext)

  useEffect(() => {
    document.title = 'Thời khóa biểu'
    setCalendarPath([{ pathName: 'Thời khóa biểu', url: mainPath.calendar }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='space-y-8'>
      {reversedAcademicYears.map((year, index) => (
        <CalendarSortingByYear key={index} year={year} />
      ))}
    </div>
  )
}
