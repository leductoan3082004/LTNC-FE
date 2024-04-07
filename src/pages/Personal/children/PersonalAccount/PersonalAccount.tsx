import { useContext, useState } from 'react'

import PersonalChangePassword from '../../components/PersonalChangePassword'
import LoadingRing from 'src/components/LoadingRing'
import { AppContext } from 'src/contexts/app.context'
import { formatDate } from 'src/utils/utils'

export default function PersonalProfile() {
  const [isChangePassWord, setIsChangePassWord] = useState(false)
  const handlePasswordClick = () => {
    setIsChangePassWord(!isChangePassWord)
  }

  //! GET PROFILE
  const { profile } = useContext(AppContext)

  if (!profile)
    return (
      <div className='items-center min-h-full justify-center py-12 flex'>
        <LoadingRing />
      </div>
    )

  const Infos = [
    {
      name: 'Ngày tạo: ',
      infor: formatDate(profile.updated_at)
    },
    {
      name: 'Ngày cập nhật: ',
      infor: formatDate(profile.updated_at)
    }
  ]

  return (
    <div className='items-center justify-center py-10 bg-webColor200'>
      <div className=' uppercase text-2xl font-bold font-sans text-darkText text-center px-6'>Tài Khoản</div>

      <div className='py-6'>
        <div className='border items-center justify-center' />
      </div>

      <div>
        {Infos.map((info, index) => (
          <div
            key={index}
            className='grid grid-cols-4 desktop:grid-cols-5 gap-4 items-center py-3 px-8 desktop:px-32 text-darkText'
          >
            <div className='col-span-1 text-right font-medium opacity-70'>{info.name}</div>
            <div className='col-span-2 desktop:col-span-4 py-2 px-4'>{info.infor}</div>
          </div>
        ))}
      </div>

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
  )
}
