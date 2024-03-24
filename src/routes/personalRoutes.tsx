import { Suspense, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import mainPath, { personalPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import PersonalAccount from 'src/pages/Personal/children/PersonalAccount'
import PersonalProfile from 'src/pages/Personal/children/PersonalProfile'
import PersonalScore from 'src/pages/Personal/children/PersonalScore'
import PersonalLayout from 'src/pages/Personal/layouts/PersonalLayout'

function PersonalRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? (
    <Suspense fallback={<LoadingPage />}>
      <PersonalLayout>
        <Outlet />
      </PersonalLayout>
    </Suspense>
  ) : (
    <Navigate to={mainPath.login} />
  )
}

const PersonalRoutes = {
  path: '',
  element: <PersonalRoute />,
  children: [
    { path: '', element: <PersonalProfile /> },
    { path: personalPath.score, element: <PersonalScore /> },
    { path: personalPath.account, element: <PersonalAccount /> }
  ]
}

export default PersonalRoutes
