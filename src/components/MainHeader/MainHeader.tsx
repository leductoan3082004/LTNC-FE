import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import mainPath, { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import PersonalPopover from './PersonalPopover'

export default function MainHeader() {
  const { isAuthenticated, profile } = useContext(AppContext)

  const menus = [
    {
      name: 'TRANG CHỦ',
      path: mainPath.home
    }
  ]

  const isAdmin = profile?.role == 2

  //! Style
  const titleClassname =
    'text-lightText uppercase justify-center rounded-lg col-span-1 relative flex items-center font-medium px-6 hover:bg-hoveringBg'

  return (
    <div
      className='w-full bg-webColor700 h-full justify-center items-center text-lightText'
      style={{ minHeight: 'inherit' }}
    >
      <div className='container flex h-full w-full justify-between'>
        <div className='flex space-x-2 py-2 justify-start '>
          <img className='bg-slate-50 rounded h-12' src='\images\HCMCUT_logo.png' alt='logo' />
          <div className='uppercase text-lg desktop:text-2xl flex items-center font-bold'>LTNC</div>
        </div>

        <div className='flex items-center justify-center'>
          <div className='grid grid-cols-4 shrink-0 h-[70%] gap-2'>
            {menus.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.path}
                className={({ isActive }) =>
                  classNames(titleClassname, {
                    'bg-hoveringBg': isActive
                  })
                }
              >
                {menu.name}
              </NavLink>
            ))}

            {isAuthenticated && (
              <NavLink
                to={mainPath.courseList}
                className={({ isActive }) =>
                  classNames(titleClassname, {
                    'bg-hoveringBg': isActive
                  })
                }
              >
                Khóa học
              </NavLink>
            )}

            {isAuthenticated && !isAdmin && (
              <NavLink
                to={mainPath.calendar}
                className={({ isActive }) =>
                  classNames(titleClassname, {
                    'bg-hoveringBg': isActive
                  })
                }
              >
                Thời khóa biểu
              </NavLink>
            )}

            {isAuthenticated && !isAdmin && (
              <NavLink
                to={mainPath.classroomList}
                className={({ isActive }) =>
                  classNames(titleClassname, {
                    'bg-hoveringBg': isActive
                  })
                }
              >
                Lớp học
              </NavLink>
            )}

            {isAdmin && (
              <NavLink
                to={adminPath.mainPage}
                className={({ isActive }) =>
                  classNames(titleClassname, {
                    'bg-hoveringBg': isActive
                  })
                }
              >
                Quản lí
              </NavLink>
            )}
          </div>
        </div>

        <div className='flex justify-end items-center '>
          {!isAuthenticated && (
            <NavLink
              to={mainPath.login}
              className='text-lightText flex h-[70%] rounded-lg items-center space-x-2 px-6 hover:bg-hoveringBg desktop:text-lg'
            >
              <FontAwesomeIcon icon={faUser} />
              <p className='uppercase font-semibold mt-1'>Đăng nhập</p>
            </NavLink>
          )}
          {isAuthenticated && <PersonalPopover />}
        </div>
      </div>
    </div>
  )
}
