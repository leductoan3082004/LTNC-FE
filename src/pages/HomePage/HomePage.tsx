import React, { Fragment, useContext, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import useClickOutside from 'src/hooks/useClickOutside'
import { useViewport } from 'src/hooks/useViewport'
import HomePageBeforeLogin from './pages/HomePageBeforeLogin'
import HomePageAfterLogin from './pages/HomePageAfterLogin'

export default function HomePage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)

  const { width } = useViewport()

  const isMoblie = width < 768

  return <div className='bg-red-100 mobileSmall:bg-red-200 tablet'></div>
}
