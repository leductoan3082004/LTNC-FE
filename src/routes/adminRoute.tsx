import { Suspense, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import mainPath, { adminPath } from 'src/constants/path'
import { AdminProvider } from 'src/contexts/admin.context'
import { AppContext } from 'src/contexts/app.context'

import AdminPages from 'src/pages/AdminPages'

import AdminLayout from 'src/layouts/AdminLayout'
import AdminCourseLayout from 'src/pages/AdminPages/layouts/AdminCourseLayout'
import AdminUserLayout from 'src/pages/AdminPages/layouts/AdminUserLayout'

import AdminClassroomDetail from 'src/pages/AdminPages/children/AdminClassroomDetail'
import AdminCourseDetail from 'src/pages/AdminPages/children/AdminCourseDetail'
import AdminCourseManagement from 'src/pages/AdminPages/children/AdminCourseManagement'
import AdminCreateClassroom from 'src/pages/AdminPages/children/AdminCreateClassroom'
import AdminCreateCourse from 'src/pages/AdminPages/children/AdminCreateCourse'
import AdminCreateUser from 'src/pages/AdminPages/children/AdminCreateUser'
import AdminStudentDetail from 'src/pages/AdminPages/children/AdminStudentDetail'
import AdminStudentList from 'src/pages/AdminPages/children/AdminStudentList'
import AdminTeacherList from 'src/pages/AdminPages/children/AdminTeacherList'
import AdminUserDetail from 'src/pages/AdminPages/children/AdminUserDetail'

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
          path: adminPath.userDetail,
          element: <AdminUserDetail />
        },
        {
          path: adminPath.studentList,
          element: <AdminStudentList />
        },
        {
          path: adminPath.studentDetail,
          element: <AdminStudentDetail />
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
      path: adminPath.classrooms,
      element: <AdminCourseRoute />,
      children: [
        {
          path: adminPath.classroomDetail,
          element: <AdminClassroomDetail />
        },
        {
          path: adminPath.createClassroom,
          element: <AdminCreateClassroom />
        }
      ]
    }
  ]
}

export default AdminRoutes
