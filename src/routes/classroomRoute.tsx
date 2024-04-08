import { Suspense } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import { classroomPath } from 'src/constants/path'
import { ClassrroomProvider } from 'src/contexts/classroom.context'
import ClassroomList from 'src/pages/ClassroomList'
import ClassroomDetail from 'src/pages/ClassroomDetail'
import ClassroomStudentScore from 'src/pages/ClassroomList/children/ClassroomStudentScore'
import ClassroomListLayout from 'src/pages/ClassroomList/layouts/ClassroomListLayout'

function ClassroomRoute() {
  return (
    <ClassrroomProvider>
      <Suspense fallback={<LoadingPage />}>
        <ClassroomListLayout>
          <Outlet />
        </ClassroomListLayout>
      </Suspense>
    </ClassrroomProvider>
  )
}

const ClassroomRoutes: RouteObject = {
  path: '',
  element: <ClassroomRoute />,
  children: [
    { path: '', element: <ClassroomList /> },
    { path: classroomPath.classroomDetail, element: <ClassroomDetail /> },
    { path: classroomPath.classroomScore, element: <ClassroomStudentScore /> }
  ]
}

export default ClassroomRoutes
