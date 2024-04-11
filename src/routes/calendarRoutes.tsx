import { calendarPath } from 'src/constants/path'
import Calendar from 'src/pages/Calendar'
import CalendarListByYear from 'src/pages/Calendar/children/CalendarByYear'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import CalendarLayout from 'src/pages/Calendar/layouts/CalendarLayout'
import { CalendarProvider } from 'src/contexts/calendar.context'
function CalendarRoute() {
  return (
    <CalendarProvider>
      <Suspense fallback={<LoadingPage />}>
        <CalendarLayout>
          <Outlet />
        </CalendarLayout>
      </Suspense>
    </CalendarProvider>

  )
}
const CalendarRoutes = {
  path: '',
  element: <CalendarRoute />,
  children: [
    { path: '', element: <Calendar /> },
    { path: calendarPath.calendarListByYear, element: <CalendarListByYear /> }
    // { path: calendarPath.calendarDetail, element: <CourseDetail /> }
  ]
}

export default CalendarRoutes