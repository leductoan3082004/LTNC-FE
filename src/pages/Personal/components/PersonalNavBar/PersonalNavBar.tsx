import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import mainPath, { personalPath } from 'src/constants/path'

export default function PersonalNavBar() {
  //! STYLES
  const navlinkClassname = 'px-4 py-4 text-lg uppercase font-medium hover:text-primaryText'

  return (
    <div className='sticky top-16 desktop:top-20 flex flex-col overflow-hidden rounded-lg border bg-black/5 border-black/60'>
      <NavLink
        to={mainPath.personal}
        end
        className={({ isActive }) =>
          classNames(navlinkClassname, {
            'text-primaryText': isActive
          })
        }
      >
        Hồ sơ
      </NavLink>
      <div className='w-full border-t border-black/20'></div>
      <NavLink
        to={personalPath.account}
        className={({ isActive }) =>
          classNames(navlinkClassname, {
            'text-primaryText': isActive
          })
        }
      >
        Tài khoản
      </NavLink>
      <div className='w-full border-t border-black/20'></div>
      <NavLink
        to={personalPath.score}
        className={({ isActive }) =>
          classNames(navlinkClassname, {
            'text-primaryText': isActive
          })
        }
      >
        Điểm
      </NavLink>
    </div>
  )
}
