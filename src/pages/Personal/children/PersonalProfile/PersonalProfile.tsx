import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
export default function PersonalProfile() {


  const [menus] = useState ([
    {
      name: "Tài Khoản: ",
      infor: "Dungdo"
    },
    {
      name: "Email: ",
      infor: "anwif@gmail.com"
    },
    {
      name: "Họ và tên: ",
      infor: "Dungdo"
    },
    {
      name: "Số điện thoại: ",
      infor: "0868712144"
    },
    {
      name: "MSSV: ",
      infor: "2210569"
    },
    {
      name: "Ngày tháng năm sinh: ",
      infor: "31/08/2004"
    },
    {
      name: "Giới tính: ",
      infor: "Nam"
    },
]);


  return (
    <div className='items-center justify-center py-10'>
      <div className='container'>
        <div className="border h-9 flex items-center py-4 font-bold font-sans text-darkText pl-16">
          Thông tin cá nhân
        </div>
        <div className='border pt-10 items-center justify-center'>
          <div className='items-center justify-center flex pb-10 relative'>
          <FontAwesomeIcon className='h-10 absolute ml-40 text-darkText mt-32 boder rounded-full border-4 bg-green-500' icon={faCamera} />
            <img className='rounded-full h-48' src='https://media.dolenglish.vn/PUBLIC/MEDIA/2b2f1391-7dcd-4d41-b1eb-2273c8cd00de.jpg' alt=''></img>
          </div>
          <div>
            {menus.map((menu, index) => (
              <div key={index} className='flex items-center py-3 text-darkText'>
                <div className='w-1/4 text-right pr-4'>{menu.name}</div>
                <div className='border rounded-md border-gray-400 border-r-inherit w-3/5 h-10 pt-2 px-4'>{menu.infor}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
)}
