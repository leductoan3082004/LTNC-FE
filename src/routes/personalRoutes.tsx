import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingPage from 'src/components/LoadingPage'
import { personalPath } from 'src/constants/path'
import PersonalAccount from 'src/pages/Personal/children/PersonalAccount'
import PersonalProfile from 'src/pages/Personal/children/PersonalProfile'
import PersonalScore from 'src/pages/Personal/children/PersonalScore'
import PersonalLayout from 'src/pages/Personal/layouts/PersonalLayout'

function PersonalRoute() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <PersonalLayout>
        <Outlet />
      </PersonalLayout>
    </Suspense>
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
