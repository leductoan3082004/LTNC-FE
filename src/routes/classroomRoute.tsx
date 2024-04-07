import { Suspense } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import { classroomPath } from 'src/constants/path'
import { ClassrroomProvider } from 'src/contexts/classroomcontext'
import ClassroomList from 'src/pages/ClassroomList'
import ClassroomDetail from 'src/pages/ClassroomList/children/ClassroomDetail'
import ClassroomLayout from 'src/pages/ClassroomList/layouts/ClassroomLayout'

function ClassroomRoute() {
  return (
    <ClassrroomProvider>
      <Suspense fallback={<LoadingPage />}>
        <ClassroomLayout>
          <Outlet />
        </ClassroomLayout>
      </Suspense>
    </ClassrroomProvider>
  )
}

const ClassroomRoutes: RouteObject = {
  path: '',
  element: <ClassroomRoute />,
  children: [
    { path: '', element: <ClassroomList /> },
    { path: classroomPath.classroomDetail, element: <ClassroomDetail /> }
  ]
}

export default ClassroomRoutes
