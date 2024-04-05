import { Suspense, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import LoadingPage from './components/LoadingPage'
import { AppContext } from './contexts/app.context'
import mainPath, { adminPath } from './constants/path'
import MainLayout from './layouts/MainLayout'
import NotFound from './components/NotFound'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ClassList from './pages/ClassList'
import Calendar from './pages/Calendar'
import ClassesRoutes from './routes/classesRoutes'
import AdminRoutes from './routes/adminRoute'
import CourseRoutes from './routes/courseRoute'
import PersonalRoutes from './routes/personalRoute'

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
      path: mainPath.courseList,
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [CourseRoutes]
    },
    {
      path: mainPath.personal,
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [PersonalRoutes]
    },
    {
      path: mainPath.classList,
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [ClassesRoutes]
      
    },
    {
      path: mainPath.calendar,
      element: (
        <MainLayout>
          <Calendar />
        </MainLayout>
      ),
    },
    { 
      path: adminPath.mainPage,
      children: [AdminRoutes]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [{ path: mainPath.login, element: <LoginPage /> }]
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
