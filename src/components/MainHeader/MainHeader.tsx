import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

export default function MainHeader() {
  const { isAuthenticated } = useContext(AppContext)

  const menus = [
    {
      name: 'TRANG CHỦ',
      path: mainPath.home
    },
    {
      name: 'TÀI KHOẢN',
      path: mainPath.personal
    },
    {
      name: 'KHÓA HỌC',
      path: mainPath.courseList
    }
  ]

  return (
    <div
      className='w-full bg-webColor700 flex flex-col h-full justify-between shrink-0 min-h-full'
      style={{ minHeight: 'inherit' }}
    >
      <div className='container flex'>
        <div className='w-1/4 flex justify-start h-14'>
          <img
            src='https://media.istockphoto.com/id/517188688/vi/anh/phong-c%E1%BA%A3nh-n%C3%BAi-non.jpg?s=612x612&w=0&k=20&c=WWWaejSo6EWGZMZSK7QK6LCfwd0rL2KB3ImCX2VkW4A='
            alt=''
          />
          <div className='flex text-center items-center pl-27'>LTNC</div>
        </div>

        <div className='w-1/2 flex items-center justify-center'>
          <div className='grid grid-cols-3 gap-x-6 max-w-7x1'>
            {menus.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.path}
                className='text-lightText flex space-x-2 py-4 px-6 hover:bg-hoveringBg shrink'
              >
                {menu.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className='w-1/4 flex justify-end'>
          {!isAuthenticated && (
            <NavLink to={mainPath.login} className='text-lightText flex space-x-2 py-4 px-6 hover:bg-hoveringBg shrink'>
              <FontAwesomeIcon icon={faUser} />
              <p className='uppercase font-semibold'>Đăng nhập</p>
            </NavLink>
          )}
          {isAuthenticated && <div className=''>Tài khoản</div>}
        </div>
      </div>
    </div>
  )
}
