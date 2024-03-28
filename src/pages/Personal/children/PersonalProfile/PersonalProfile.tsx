import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faUser } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from 'src/contexts/app.context'
import LoadingRing from 'src/components/LoadingRing'
import { generateID } from 'src/utils/utils'

export default function PersonalProfile() {
  const [isAvatar, setIsAvatar] = useState(false)
  const handleClick = () => {
    setIsAvatar(!isAvatar)
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
      name: 'MSSV: ',
      infor: generateID(profile._id)
    },
    {
      name: 'Họ và tên: ',
      infor: profile.name
    },
    {
      name: 'Số điện thoại: ',
      infor: profile.phone
    },
    {
      name: 'Địa chỉ: ',
      infor: profile.address
    }
  ]

  return (
    <div className='items-center justify-center py-10 bg-webColor200'>
      <div className=' uppercase text-2xl font-bold font-sans text-darkText text-center px-6'>Thông tin cá nhân</div>

      <div className='py-6'>
        <div className='border items-center justify-center' />
      </div>

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
            <div className='absolute -bottom-10 space-y-1  border items-center rounded-lg justify-center bg-gray-200 '>
              <div className='pt-1 px-2'>
                <div className='px-3 flex w-full py-2 hover:cursor-pointer rounded-lg hover:bg-gray-100'>
                  <FontAwesomeIcon className='pr-3' icon={faUser} />
                  <div className='pr-20'>Xem ảnh đại diện</div>
                </div>
              </div>
              <div className='px-2'>
                <div className='px-3 flex py-2 hover:cursor-pointer rounded-lg hover:bg-gray-100'>
                  <FontAwesomeIcon className='pr-3 ' icon={faUser} />
                  <div className='pr-20'>Chọn ảnh đại diện</div>
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
        {Infos.map((info, index) => (
          <div key={index} className='grid grid-cols-4 gap-4 items-center py-3 px-8 desktop:px-32 text-darkText'>
            <div className='col-span-2 d text-right opacity-70'>{info.name}</div>
            <div className='col-span-2 py-2 font-medium'>{info.infor}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
