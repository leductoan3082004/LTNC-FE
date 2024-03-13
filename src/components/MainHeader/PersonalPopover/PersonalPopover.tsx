import { faCaretDown, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import FloatingOnClick from 'src/components/FoatingOnClick'
import mainPath, { personalPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

export default function PersonalPopover() {
  const { profile, logoutFunction } = useContext(AppContext)

  //! STYLES
  const itemStyle = 'py-2 px-4 flex items-center justify-start w-full select-none hover:bg-webColor200'

  return (
    <div className='rounded-lg border border-white/60 overflow-hidden flex items-center text-lightText'>
      <div className='flex items-center h-12'>
        <NavLink
          to={mainPath.personal}
          className='flex space-x-2 px-2 items-center h-full hover:bg-hoveringBg  border-r border-white/60'
        >
          <FontAwesomeIcon icon={faCircleUser} className='h-8 w-8' />
          <div className='desktop:text-lg font-medium duration-200'>{profile ? profile.name : 'Thanh'}</div>
        </NavLink>
        <FloatingOnClick
          className='h-full flex items-center'
          offsetValue={16}
          arrowClassname='invisible'
          placement='bottom-end'
          renderPopover={
            <div className='py-2 desktop:text-lg space-y-2 text-darkText min-w-40 rounded-md shadow-lg bg-webColor100 overflow-hidden'>
              <div className=''>
                <NavLink to={mainPath.personal} className={itemStyle}>
                  Hồ sơ
                </NavLink>

                <NavLink to={personalPath.score} className={itemStyle}>
                  Điểm
                </NavLink>

                <NavLink to={personalPath.account} className={itemStyle}>
                  Tài khoản
                </NavLink>
              </div>
              <div className='w-full border-t border-black/20'></div>
              <button className={itemStyle} onClick={() => logoutFunction()}>
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='px-2 h-full flex items-center justify-center cursor-pointer hover:bg-hoveringBg'>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </FloatingOnClick>
      </div>
    </div>
  )
}
