import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
export default function PersonalProfile() {

  const [isNotHidden, setIsNotHidden] = useState(false);
  const handleClick = () => {
    setIsNotHidden(!isNotHidden);
  };
  const [menus] = useState([
    {
      name: "Tên đăng nhập: ",
      infor: "Dungdo"
    },
    {
      name: "Mật khẩu: ",
      infor: "**************"
    },
  ]);


  return (
    <div className='items-center justify-center py-10 bg-webColor200'>
      <div className='container'>
        <div className="border h-9 flex items-center py-4 font-bold font-sans text-darkText pl-16">
          Tài Khoản
        </div>


        <div className='border pt-10 items-center justify-center'>
          <div>
            <div className='flex items-center py-3 text-darkText'>
              <div className='w-1/4 text-right pr-4'>Tên đăng nhập: </div>
              <div className='border rounded-md border-webColor600 w-3/5 h-10 pt-2 px-4'>Dungdo</div>
            </div>
            <div className='flex items-center py-3 text-darkText'>
              <div className='w-1/4 text-right pr-4'>Mật khẩu: </div>
              <div className='flex border rounded-md border-webColor600 w-3/5 h-10 pt-2 pl-4 items-center'>
                <div className='w-11/12'>******</div>
                <div className='w-1/12 items-center justify-end pl-3 pb-1 cursor-pointer' onClick={handleClick} aria-hidden='true'>
                  <FontAwesomeIcon icon={faEyeSlash} />
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>

  )
}
