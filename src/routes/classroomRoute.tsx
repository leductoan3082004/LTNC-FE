import { Fragment, ReactNode, Suspense, useContext } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import mainPath, { classroomPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ClassrroomProvider } from 'src/contexts/classroom.context'
import ClassroomList from 'src/pages/ClassroomList'
import ClassroomDetail from 'src/pages/ClassroomDetail'
import ClassroomMemberListForTeacher from 'src/pages/ClassroomDetail/children/ClassroomMemberListForTeacher'
import ClassroomScoreForStudent from 'src/pages/ClassroomDetail/children/ClassroomScoreForStudent'
import ClassroomDetailLayout from 'src/pages/ClassroomDetail/layouts/ClassroomDetailLayout'
import ClassroomListLayout from 'src/pages/ClassroomList/layouts/ClassroomListLayout'
import ClassroomListByYear from 'src/pages/ClassroomList/children/ClassroomListByYear'

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

function TeacherRoute({ children }: { children: ReactNode }) {
  const { profile } = useContext(AppContext)
  return profile?.role != 0 ? <Fragment>{children} </Fragment> : <Navigate to={classroomPath.classroomDetail} />
}

function StudentRoute({ children }: { children: ReactNode }) {
  const { profile } = useContext(AppContext)
  return profile?.role == 0 ? <Fragment>{children} </Fragment> : <Navigate to={classroomPath.classroomDetail} />
}

const ClassroomRoutes: RouteObject = {
  path: '',
  element: <ClassroomRoute />,
  children: [
    { path: '', element: <ClassroomList /> },
    { path: classroomPath.classroomListByYear, element: <ClassroomListByYear /> },
    {
      path: classroomPath.classroomDetail,
      element: <ClassroomDetailRoute />,
      children: [
        { path: '', element: <ClassroomDetail /> },
        {
          path: classroomPath.classroomMemberList,
          element: (
            <TeacherRoute>
              <ClassroomMemberListForTeacher />
            </TeacherRoute>
          )
        },
        {
          path: classroomPath.classroomScore,
          element: (
            <StudentRoute>
              <ClassroomScoreForStudent />
            </StudentRoute>
          )
        }
      ]
    }
  ]
}

export default ClassroomRoutes
