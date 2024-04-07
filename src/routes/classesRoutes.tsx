import { Suspense } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import { classPath, coursePath } from 'src/constants/path'
import { ClassesProvider } from 'src/contexts/classes.context'
import ClassList from 'src/pages/ClassList'
import ClassroomDetail from 'src/pages/ClassList/children/ClassroomDetail'
import ClassListLayout from 'src/pages/ClassList/layouts/ClassListLayout'

function ClassesRoute() {
  return (
    <ClassesProvider>
      <Suspense fallback={<LoadingPage />}>
        <ClassListLayout>
          <Outlet />
        </ClassListLayout>
      </Suspense>
    </ClassesProvider>
  )
}

const ClassesRoutes: RouteObject = {
  path: '',
  element: <ClassesRoute />,
  children: [
    { path: '', element: <ClassList /> },
    { path: classPath.classesDetail, element: <ClassroomDetail /> }
  ]
}

export default ClassesRoutes
