import React, { useContext } from 'react'
import MainFooter from 'src/components/MainFooter'
import { AppContext } from 'src/contexts/app.context'
import HomePageBeforeLogin from './HomePageBeforeLogin'
import HomePageAfterLogin from './HomePageAfterLogin'
export default function HomePage() {


  
const {isAuthenticated} = useContext(AppContext)





  return (
    <div>
        {!isAuthenticated && <HomePageBeforeLogin/>}
    </div>
  )
}
