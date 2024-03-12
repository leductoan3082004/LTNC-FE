import { useViewport } from 'src/hooks/useViewport'
import React, { useState } from 'react'
import mainPath from 'src/constants/path'
import {Link, NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from 'src/contexts/app.context'


export default function MainHeader() {
  const viewport = useViewport()
  const isSmall = viewport.width < 768
  //? Style
  const popoverStyle = 'border border-black/20 rounded-lg min-w-52 py-3 px-2 text-sm dekstop:text-base'
  const wrapperStyle = 'text-darkText font-medium flex flex-col space-y-1'
  const itemStyle =
    'tablet:hover:text-white hover:text-black px-4 tablet:px-3 py-1.5 duration-200 tablet:hover:bg-primaryBlueHovering/80 tablet:rounded-md'
    const [menus] = useState ([
      {
          name: 'TRANG CHỦ',
          path: mainPath.home,
      },
      {
          name: 'TÀI KHOẢN',
          path: mainPath.personal,
      },
      {
          name: 'KHÓA HỌC',
          path: mainPath.courseList,
      },
    ]);
  return (
    <div className='w-full bg-webColor700 flex flex-col h-14 justify-between shrink-0 min-h-full' style={{ minHeight: 'inherit' }}>
      
      <div className='container w-full flex text-1xl'>

        <div className='w-1/4 flex justify-start h-14'>
          <img className='h-full pr-3' src='https://i.ibb.co/T41xQpn/def.png' alt='' />


          <div className='flex text-center items-center ml-27 text-lightText'>
            LTNC-FE
          </div>
        </div>


        <div className="w-1/2 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-x-6 max-w-7x1">
                  {menus.map((menu, index) => (
                    <NavLink key={index} to={menu.path} className='text-lightText flex space-x-2 py-4 px-6 hover:bg-hoveringBg shrink'>{menu.name}</NavLink>
                  ))}
              </div>
        </div> 

        <div className='w-1/4 flex items-center justify-end'>
              <NavLink to={mainPath.login} className='text-lightText flex space-x-2 py-4 px-6 hover:bg-hoveringBg shrink'>
              <FontAwesomeIcon icon={faUser} />
                <p className='uppercase font-semibold'>Acount</p>
              </NavLink>
        </div>
      </div>
    </div>
  )
}
