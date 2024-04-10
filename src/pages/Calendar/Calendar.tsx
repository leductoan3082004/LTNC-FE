import { useContext, useEffect } from 'react'
import { CalendarContext } from 'src/contexts/calendar.context'
import mainPath from 'src/constants/path'
import CalendarSortingtByYear from './components/CalendarSortingtByYear'

export default function Calendar() {
  const { setCalendarPath } = useContext(CalendarContext)

  useEffect(() => {
    setCalendarPath([{ pathName: 'Thời khóa biểu', url: mainPath.calendar }])
  }, [])
  return (
    <div className='space-y-8'>
      <CalendarSortingtByYear year={2024}></CalendarSortingtByYear>
      <CalendarSortingtByYear year={2025}></CalendarSortingtByYear>
      <CalendarSortingtByYear year={2026}></CalendarSortingtByYear>
      <CalendarSortingtByYear year={2027}></CalendarSortingtByYear>
    </div>
  )
}
