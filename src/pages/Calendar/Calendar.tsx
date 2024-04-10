import { useContext, useEffect } from 'react'
import { CalendarContext } from 'src/contexts/calendar.context'
import mainPath from 'src/constants/path'
import CalendarSortingtByYear from './components/CalendarSortingtByYear'
import academicYears from 'src/constants/academicYears'

export default function Calendar() {
  const { setCalendarPath } = useContext(CalendarContext)

  useEffect(() => {
    setCalendarPath([{ pathName: 'Thời khóa biểu', url: mainPath.calendar }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='space-y-8'>
      {academicYears.map((year, index) => (
        <CalendarSortingtByYear key={index} year={year} />
      ))}
    </div>
  )
}
