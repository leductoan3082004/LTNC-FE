import { Suspense, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import mainPath, { adminPath } from 'src/constants/path'
import { AdminProvider } from 'src/contexts/admin.context'
import { AppContext } from 'src/contexts/app.context'
import AdminLayout from 'src/layouts/AdminLayout'
import AdminPages from 'src/pages/AdminPages'
import AdminClassroomDetail from 'src/pages/AdminPages/children/AdminClassroomDetail'
import AdminCourseDetail from 'src/pages/AdminPages/children/AdminCourseDetail'
import AdminCourseManagement from 'src/pages/AdminPages/children/AdminCourseManagement'
import AdminCreateClass from 'src/pages/AdminPages/children/AdminCreateClass'
import AdminCreateCourse from 'src/pages/AdminPages/children/AdminCreateCourse'
import AdminCreateUser from 'src/pages/AdminPages/children/AdminCreateUser'
import AdminStudentList from 'src/pages/AdminPages/children/AdminStudentList'
import AdminTeacherList from 'src/pages/AdminPages/children/AdminTeacherList'
import AdminCourseLayout from 'src/pages/AdminPages/layouts/AdminCourseLayout'
import AdminUserLayout from 'src/pages/AdminPages/layouts/AdminUserLayout/AdminUserLayout'

function ProtectedAdminRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)

  return isAuthenticated && profile && profile.role == 2 ? (
    <AdminLayout>
      <AdminProvider>
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </AdminProvider>
    </AdminLayout>
  ) : (
    <Navigate to={mainPath.login} />
  )
}

function AdminUserRoute() {
  return (
    <AdminUserLayout>
      <Outlet />
    </AdminUserLayout>
  )
}

function AdminCourseRoute() {
  return (
    <AdminCourseLayout>
      <Outlet />
    </AdminCourseLayout>
  )
}

const AdminRoutes = {
  path: '',
  element: <ProtectedAdminRoute />,
  children: [
    { path: '', element: <AdminPages /> },
    {
      path: adminPath.users,
      element: <AdminUserRoute />,
      children: [
        {
          path: adminPath.studentList,
          element: <AdminStudentList />
        },
        {
          path: adminPath.teacherList,
          element: <AdminTeacherList />
        },
        {
          path: adminPath.createUser,
          element: <AdminCreateUser />
        }
      ]
    },
    {
      path: adminPath.courses,
      element: <AdminCourseRoute />,
      children: [
        {
          path: '',
          element: <AdminCourseManagement />
        },
        {
          path: adminPath.courseDetail,
          element: <AdminCourseDetail />
        },
        {
          path: adminPath.createCourse,
          element: <AdminCreateCourse />
        }
      ]
    },
    {
      path: adminPath.classes,
      element: <AdminCourseRoute />,
      children: [
        {
          path: adminPath.classDetail,
          element: <AdminClassroomDetail />
        },
        {
          path: adminPath.createClass,
          element: <AdminCreateClass />
        }
      ]
    }
  ]
}

export default AdminRoutes
