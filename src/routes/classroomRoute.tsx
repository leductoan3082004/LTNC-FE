import { Suspense, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import mainPath, { classroomPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ClassrroomProvider } from 'src/contexts/classroom.context'
import ClassroomList from 'src/pages/ClassroomList'
import ClassroomDetail from 'src/pages/ClassroomList/children/ClassroomDetail'
import ClassroomMemberListForTeacher from 'src/pages/ClassroomList/children/ClassroomMemberListForTeacher'
import ClassroomScoreForStudent from 'src/pages/ClassroomList/children/ClassroomScoreForStudent'
import ClassroomDetailLayout from 'src/pages/ClassroomList/layouts/ClassroomDetailLayout'
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
    {
      path: classroomPath.classroomDetail,
      element: <ClassroomDetailRoute />,
      children: [
        { path: '', element: <ClassroomDetail /> },
        { path: classroomPath.classroomMemberList, element: <ClassroomMemberListForTeacher /> },
        { path: classroomPath.classroomScore, element: <ClassroomScoreForStudent /> }
      ]
    }
  ]
}

export default ClassroomRoutes
