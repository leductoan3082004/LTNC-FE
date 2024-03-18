import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import { coursePath } from 'src/constants/path'
import { CourseProvider } from 'src/contexts/course.context'
import CourseDetail from 'src/pages/CourseDetail'
import CourseList from 'src/pages/CourseList'
import CourseListByYear from 'src/pages/CourseList/children/CourseListByYear'
import CourseListLayout from 'src/pages/CourseList/layouts/CourseListLayout'

function CourseRoute() {
  return (
    <CourseProvider>
      <Suspense fallback={<LoadingPage />}>
        <CourseListLayout>
          <Outlet />
        </CourseListLayout>
      </Suspense>
    </CourseProvider>
  )
}

const CourseRoutes = {
  path: '',
  element: <CourseRoute />,
  children: [
    { path: '', element: <CourseList /> },
    { path: coursePath.courseListByYear, element: <CourseListByYear /> },
    { path: coursePath.courseDetail, element: <CourseDetail /> }
  ]
}

export default CourseRoutes
