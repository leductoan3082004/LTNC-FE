import { Suspense, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import mainPath, { classroomPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ClassrroomProvider } from 'src/contexts/classroom.context'
import ClassroomList from 'src/pages/ClassroomList'
import ClassroomDetail from 'src/pages/ClassroomDetail'
import ClassroomMemberListForTeacher from 'src/pages/ClassroomDetail/children/ClassroomMemberListForTeacher'
import ClassroomScoreForStudent from 'src/pages/ClassroomDetail/children/ClassroomScoreForStudent'
import ClassroomStudentScore from 'src/pages/ClassroomList/children/ClassroomStudentScore'
import ClassroomDetailLayout from 'src/pages/ClassroomDetail/layouts/ClassroomDetailLayout'
import ClassroomListLayout from 'src/pages/ClassroomList/layouts/ClassroomListLayout'

function ClassroomRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? (
    <ClassrroomProvider>
      <Suspense fallback={<LoadingPage />}>
        <ClassroomListLayout>
          <Outlet />
        </ClassroomListLayout>
      </Suspense>
    </ClassrroomProvider>
  ) : (
    <Navigate to={mainPath.login} />
  )
}

function ClassroomDetailRoute() {
  return (
    <ClassroomDetailLayout>
      <Outlet />
    </ClassroomDetailLayout>
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
