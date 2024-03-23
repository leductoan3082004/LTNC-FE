import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
export default function PersonalProfile() {
  const [isAvatar, setIsAvatar] = useState(false)
  const handleClick = () => {
    setIsAvatar(!isAvatar)
  }
  const menus = [
    {
      name: 'Tài Khoản: ',
      infor: 'Dungdo'
    },
    {
      name: 'Email: ',
      infor: 'anwif@gmail.com'
    },
    {
      name: 'Họ và tên: ',
      infor: 'Dungdo'
    },
    {
      name: 'Số điện thoại: ',
      infor: '0868712144'
    },
    {
      name: 'MSSV: ',
      infor: '2210569'
    },
    {
      name: 'Ngày tháng năm sinh: ',
      infor: '31/08/2004'
    },
    {
      name: 'Giới tính: ',
      infor: 'Nam'
    }
  ]


  return (
    <div className='items-center justify-center py-10 bg-webColor200'>
      <div className='container'>
        <div className='border h-9 flex items-center py-4 font-bold font-sans text-darkText pl-16'>
          Thông tin cá nhân
        </div>

        <div className='border pt-10 items-center justify-center'>
          <div className='items-center justify-center flex pb-10 relative '>
            <div>
              <div
                className=' h-14 w-14 absolute ml-36 mt-9 boder rounded-full border bg-gray-200 flex items-center justify-center '
                onClick={handleClick}
                aria-hidden='true'
              >
                <FontAwesomeIcon className='h-9 w-9 absolute text-darkText cursor-pointer' icon={faCamera} />
              </div>
              {isAvatar && (
                <div className='absolute ml-20 mt-24 h-24  border items-center rounded-lg justify-center bg-gray-200 '>
                  <div className='h-1/2 pt-1 px-2'>
                    <div className='px-3 flex w-full pt-2 hover:border hover: rounded-lg hover:bg-gray-100 hover:h-10'>
                      <FontAwesomeIcon className='pr-3' icon={faUser} />

                      <NavLink to={'....'} className='pr-20'>
                        Xem ảnh đại diện
                      </NavLink>

                    </div>
                  </div>
                  <div className='h-1/2 px-2'>
                    <div className='px-3 flex pt-2 hover:border hover: rounded-lg hover:bg-gray-100 hover:h-10'>
                      <FontAwesomeIcon className='pr-3 ' icon={faUser} />

                      <NavLink to={'....'} className='pr-20'>
                        Chọn ảnh đại diện
                      </NavLink>

                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>

              <img
                className='rounded-full h-48 border-4'
                src='https://media.dolenglish.vn/PUBLIC/MEDIA/2b2f1391-7dcd-4d41-b1eb-2273c8cd00de.jpg'
                alt=''
              ></img>
            </div>

          </div>
          <div>
            {menus.map((menu, index) => (
              <div key={index} className='flex items-center py-3 text-darkText'>
                <div className='w-1/4 text-right pr-4'>{menu.name}</div>
                <div className='border rounded-md border-webColor600 w-3/5 h-10 pt-2 px-4'>{menu.infor}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}
