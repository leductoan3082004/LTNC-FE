import { Suspense, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import mainPath, { personalPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { PersonalScoreProvider } from 'src/contexts/personalscore.context'
import PersonalAccount from 'src/pages/Personal/children/PersonalAccount'
import PersonalProfile from 'src/pages/Personal/children/PersonalProfile'
import PersonalScore from 'src/pages/Personal/children/PersonalScore'
import PersonalScoreByYear from 'src/pages/Personal/children/PersonalScoreByYear'
import PersonalScoreAllYear from 'src/pages/Personal/components/PersonalScoreAllYear'
import PersonalLayout from 'src/pages/Personal/layouts/PersonalLayout'

function PersonalRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? (
    <PersonalLayout>
      <PersonalScoreProvider>
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </PersonalScoreProvider>
    </PersonalLayout>
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
    { path: personalPath.account, element: <PersonalAccount /> },
    { path: personalPath.scoreByYear, element: <PersonalScoreByYear /> },
    { path: personalPath.scoreAllYear, element: <PersonalScoreAllYear /> }
  ]
}

export default PersonalRoutes
