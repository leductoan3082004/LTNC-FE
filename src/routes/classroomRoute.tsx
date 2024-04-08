import { Suspense, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import mainPath, { classroomPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ClassrroomProvider } from 'src/contexts/classroom.context'
import ClassroomList from 'src/pages/ClassroomList'
import ClassroomDetail from 'src/pages/ClassroomList/children/ClassroomDetail'
import ClassroomLayout from 'src/pages/ClassroomList/layouts/ClassroomLayout'

function ClassroomRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? (
    <ClassrroomProvider>
      <Suspense fallback={<LoadingPage />}>
        <ClassroomLayout>
          <Outlet />
        </ClassroomLayout>
      </Suspense>
    </ClassrroomProvider>
  ) : (
    <Navigate to={mainPath.login} />
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
