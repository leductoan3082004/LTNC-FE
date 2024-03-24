import { useState } from 'react'

import PersonalChangePassword from '../../components/PersonalChangePassword'

export default function PersonalProfile() {
  const [isChangePassWord, setIsChangePassWord] = useState(false)
  const handlePasswordClick = () => {
    setIsChangePassWord(!isChangePassWord)
  }

  return (
    <div className='items-center justify-center p-10 bg-webColor100'>
      <div className='rounded-md border border-black/40 py-8'>
        <div className=' uppercase text-2xl font-bold font-sans text-darkText text-center px-6'>Tài Khoản</div>

        <div className='mt-8 px-8 desktop:px-20 items-center justify-center'>
          {/* <div className='space-y-4'>
            <div className='flex items-center space-x-4 text-darkText'>
              <div className='w-1/4 text-right'>Vai trò: </div>
              <div className='border rounded-md border-webColor600 w-3/4 h-10 flex items-center px-4'>
                {userRoles[profile.role]}
              </div>
            </div>
            <div className='flex items-center space-x-4 text-darkText'>
              <div className='w-1/4 text-right'>Mật khẩu: </div>
              <div className='flex border rounded-md border-webColor600 w-3/4 h-10 px-4 items-center'>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex space-x-0.5 text-xs'>
                    {Array(8)
                      .fill(0)
                      .map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faAsterisk} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className='flex items-center justify-center w-full mt-12 text-darkText '>
            {isChangePassWord && <p className='uppercase font-medium text-lg desktop:text-xl'>ĐỔI MẬT KHẨU</p>}
            {!isChangePassWord && (
              <button
                className='flex items-center justify-center py-2 px-4 rounded-md bg-unhoverBg hover:bg-hoveringBg'
                onClick={handlePasswordClick}
              >
                Đổi mật khẩu
              </button>
            )}
          </div>
          {isChangePassWord && <PersonalChangePassword setIsChangePassWord={setIsChangePassWord} />}
        </div>
      </div>
    </div>
  )
}
