import { Suspense, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import mainPath, { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import AdminLayout from 'src/layouts/AdminLayout'
import AdminPages from 'src/pages/AdminPages'

function ProtectedAdminRoute() {
  const { isAuthenticated } = useContext(AppContext)
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

const AdminRoutes = {
  path: '',
  element: <ProtectedAdminRoute />,
  children: [
    { path: '', element: <AdminPages /> },
    {
      path: adminPath.users,
      element: (
        <AdminPostManagementLayout>
          <AdminPostManagement />
        </AdminPostManagementLayout>
      )
    }
  ]
}

export default AdminRoutes
