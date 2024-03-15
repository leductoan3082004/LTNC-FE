import { Suspense, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import LoadingPage from './components/LoadingPage'
import { AppContext } from './contexts/app.context'
import mainPath from './constants/path'
import MainLayout from './layouts/MainLayout'
import NotFound from './components/NotFound'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Personal from './pages/Personal'

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={mainPath.home} />
  )
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      index: true,
      path: mainPath.home,
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [{ path: mainPath.login, element: <LoginPage /> }]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [{ path: mainPath.personal, element: <Personal /> }]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
