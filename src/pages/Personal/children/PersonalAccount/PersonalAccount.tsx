import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEye, faEyeSlash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
export default function PersonalProfile() {

  const [isHidden, setIsHidden] = useState(false);
  const handleHiddenClick = () => {
    setIsHidden(!isHidden);
  };
  const [isChangePassWord, setIsChangePassWord] = useState(false);
  const handlePasswordClick = () => {
    setIsChangePassWord(!isChangePassWord);
  };
  const [menus] = useState([
    {
      name: "Mật Khẩu cũ: ",
    },
    {
      name: "Mật khẩu mới: ",
    },
    {
      name: "Xác nhận mật khẩu: ",
    },
  ]);


  return (
    <div className='items-center justify-center py-10 bg-webColor200'>
      <div className='container'>
        <div className="border h-9 flex items-center py-4 font-bold font-sans text-darkText pl-16 ">
          Tài Khoản
        </div>


        <div className='border pt-10 items-center justify-center'>
          <div>
            <div className='flex items-center py-3 text-darkText'>
              <div className='w-1/4 text-right pr-4'>Tên đăng nhập: </div>
              <div className='border rounded-md border-webColor600 w-3/5 h-10 pt-2.5 px-4'>Dungdo</div>
            </div>
            <div className='flex items-center py-3 text-darkText'>
              <div className='w-1/4 text-right pr-4'>Mật khẩu: </div>
              {!isHidden && (
                <div className='flex border rounded-md border-webColor600 w-3/5 h-10 pt-2 pl-4 items-center'>
                  <div className='w-11/12'>************</div>
                  <div className='w-1/12 items-center justify-end pl-3 pb-1 cursor-pointer' onClick={handleHiddenClick} aria-hidden='true'>
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </div>
                </div>
              )}
              {isHidden && (
                <div className='flex border rounded-md border-webColor600 w-3/5 h-10 pt-2 pl-4 items-center'>
                  <div className='w-11/12 pb-2'>dungkhongsuy</div>
                  <div className='w-1/12 items-center justify-end pl-3 pb-1 cursor-pointer' onClick={handleHiddenClick} aria-hidden='true'>
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                </div>
              )}
            </div>
            <div className='flex items-center py-3 text-darkText pt-8'>
              <div className='w-1/4'></div>
              <div className='flex cursor-pointer' onClick={handlePasswordClick} aria-hidden='true'>
                {!isChangePassWord && <div className='border rounded-md border-webColor600 w-5 h-5'></div>}
                {isChangePassWord && (
                  <div className='flex relative'>
                    <div className='border rounded-md border-webColor600 bg-webColor600 w-5 h-5'></div>
                    <FontAwesomeIcon className='absolute pl-0.5 pt-0.5' icon={faCheck} />
                  </div>
                )}
                <div className='pl-3'>Thay đổi mật khẩu</div>
              </div>
            </div>
            {isChangePassWord && menus.map((menu, index) => (
              <div key={index} className='flex items-center py-3 text-darkText bg-webColor200'>
                <div className='w-1/4 text-right pr-4'>{menu.name}</div>
                <input className='border rounded-md border-webColor600 w-3/5 h-10 px-4 bg-webColor200 '></input>
              </div>
            ))}
            <div className='flex py-8'>
              <div className='w-1/4'></div>
              <a href='../../personal/account' className='border rounded-lg text-darkText flex px-5 py-3 border-webColor600 bg-webColor600 hover:bg-webColor500'>
                <FontAwesomeIcon icon={faFloppyDisk} />
                <div className='pl-3'>Lưu</div>
              </a>
            </div>
            <div>

            </div>
          </div>
        </div>



      </div>
    </div>

  )
}
