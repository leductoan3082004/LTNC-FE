import { Suspense, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import mainPath, { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import AdminLayout from 'src/layouts/AdminLayout'
import AdminPages from 'src/pages/AdminPages'
import AdminUserManagement from 'src/pages/AdminPages/children/AdminUserManagement'
import AdminUserLayout from 'src/pages/AdminPages/layouts/AdminUserLayout/AdminUserLayout'

function ProtectedAdminRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)

  return isAuthenticated ? (
    <Suspense fallback={<LoadingPage />}>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </Suspense>
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
          path: adminPath.users,
          element: <AdminUserManagement />
        }
      ]
    }
  ]
}

export default AdminRoutes
