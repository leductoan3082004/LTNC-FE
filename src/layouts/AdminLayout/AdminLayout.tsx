import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'

interface Props {
  children?: React.ReactNode
}

interface NavigateItem {
  name: string
  url: string
}

const userMenu: NavigateItem[] = [
  { name: 'Tài khoản sinh viên', url: adminPath.studentList },
  { name: 'Tài khoản giáo viên', url: adminPath.teacherList },
  { name: 'Tạo tài khoản', url: adminPath.createUser }
]

const courseMenu: NavigateItem[] = [
  { name: 'Danh sách khóa học', url: adminPath.courses },
  { name: 'Tạo khóa học', url: adminPath.createCourse }
]

export default function AdminLayout({ children }: Props) {
  return (
    <div className='grid grid-cols-12 gap-2'>
      <div className='col-span-2 p-4 relative'>
        <div className='bg-webColor100 py-4 flex flex-col space-y-4 w-full rounded-lg sticky top-4'>
          <div className='w-full'>
            <p className='font-medium pl-2 uppercase'>Quản lý tài khoản</p>
            <div className='mt-2 w-full'>
              {userMenu.map((item, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    classNames('flex py-2 w-full border-t border-black/10 hover:bg-hoveringBg', {
                      'bg-hoveringBg': isActive
                    })
                  }
                  to={item.url}
                >
                  <div className='pl-4 flex space-x-2 items-center'>
                    <FontAwesomeIcon icon={faChevronRight} className='text-xs' />
                    <p className=''>{item.name}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          <div className='w-full'>
            <p className='font-medium pl-2 uppercase'>Quản lý khóa học</p>
            <div className='mt-2 w-full'>
              {courseMenu.map((item, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    classNames('flex py-2 w-full border-t border-black/10 hover:bg-hoveringBg', {
                      'bg-hoveringBg': isActive
                    })
                  }
                  to={item.url}
                >
                  <div className='pl-4 flex space-x-2 items-center'>
                    <FontAwesomeIcon icon={faChevronRight} className='text-xs' />
                    <p className=''>{item.name}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          <div className='w-full'>
            <p className='font-medium pl-2 uppercase'>Quản lý lớp học</p>
            <div className='mt-2 w-full'>
              {userMenu.map((item, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    classNames('flex py-2 w-full border-t border-black/10 hover:bg-hoveringBg', {
                      'bg-hoveringBg': isActive
                    })
                  }
                  to={item.url}
                >
                  <div className='pl-4 flex space-x-2 items-center'>
                    <FontAwesomeIcon icon={faChevronRight} className='text-xs' />
                    <p className=''>{item.name}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-9 p-4'>{children}</div>
    </div>
  )
}
