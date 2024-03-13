import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import PersonalPopover from './PersonalPopover'

export default function MainHeader() {
  const { isAuthenticated } = useContext(AppContext)

  const menus = [
    {
      name: 'TRANG CHỦ',
      path: mainPath.home
    },
    {
      name: 'THỜI KHÓA BIỂU',
      path: mainPath.calendar
    },
    {
      name: 'KHÓA HỌC',
      path: mainPath.courseList
    },
    {
      name: 'LỚP HỌC',
      path: mainPath.classList
    }
  ]

  //! STYLES

  return (
    <div
      className='w-full bg-webColor700 h-12 desktop:h-16 justify-center items-center'
      style={{ minHeight: 'inherit' }}
    >
      <div className='container flex h-full'>
        <div className='w-1/4 flex space-x-2 py-2 justify-start'>
          <img
            src='https://media.istockphoto.com/id/517188688/vi/anh/phong-c%E1%BA%A3nh-n%C3%BAi-non.jpg?s=612x612&w=0&k=20&c=WWWaejSo6EWGZMZSK7QK6LCfwd0rL2KB3ImCX2VkW4A='
            alt=''
          />
          <div className='uppercase text-lg desktop:text-xl  flex items-center font-bold'>LTNC</div>
        </div>

        <div className='w-1/2 flex items-center justify-center'>
          <div className='grid grid-cols-4 shrink-0 h-[70%] gap-2'>
            {menus.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.path}
                className={({ isActive }) =>
                  classNames(
                    'text-lightText justify-center rounded-lg col-span-1 relative flex items-center font-medium desktop:text-lg px-6 hover:bg-hoveringBg',
                    {
                      'bg-hoveringBg': isActive
                    }
                  )
                }
              >
                {menu.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className='w-1/4 flex justify-end items-center '>
          {isAuthenticated && (
            <NavLink
              to={mainPath.login}
              className='text-lightText flex h-[70%] rounded-lg items-center space-x-2 px-6 hover:bg-hoveringBg desktop:text-lg'
            >
              <FontAwesomeIcon icon={faUser} />
              <p className='uppercase font-semibold mt-1'>Đăng nhập</p>
            </NavLink>
          )}
          {!isAuthenticated && <PersonalPopover />}
        </div>
      </div>
    </div>
  )
}
