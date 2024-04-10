
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { generateID } from 'src/utils/utils'

export default function PersonalInScore() {
  const { profile } = useContext(AppContext)


  return (
    <div className='items-center justify-center p-4 bg-webColor200 w-full'>
      <div className='border border-transparent flex items-center py-2 text-lg desktop:text-xl font-bold text-darkText text-start '>
        <div className='w-1/4 text-left uppercase'> Tài Khoản </div>
      </div>
      <div className='border flex border-transparent items-center py-2 text-lg desktop:text-xl font-medium text-darkText text-start6 '>
        <div className='w-1/4 text-left opacity-70'>Tên sinh viên: </div>
        <div className='border rounded-md border-transparent w-3/5 px-4'>{profile?.name}</div>
      </div>
      <div className='border border-transparent flex items-center py-2 text-lg desktop:text-xl font-medium text-darkText text-start '>
        <div className='w-1/4 text-left opacity-70'>Mã số sinh viên: </div>
        <div className='border rounded-md border-transparent w-3/5 px-4'>{generateID(profile?._id || '')}</div>
      </div>
    </div>
  )
}
