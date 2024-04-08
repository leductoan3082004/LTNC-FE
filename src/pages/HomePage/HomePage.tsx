import React, { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import HomePageBeforeLogin from './HomePageBeforeLogin'
import HomePageAfterLogin from './HomePageAfterLogin'
//import HomePageStudent from './HomePageStudent/HomePageStudent'
export default function HomePage() {  
const {isAuthenticated} = useContext(AppContext)
  return (
    <div>
      {!isAuthenticated && <HomePageBeforeLogin />}
      {isAuthenticated && <HomePageAfterLogin/>}
    </div>
  )
}
