import ScoreSorting from '../../components/PersonalScoreSorting'
import { useContext} from 'react'
import { PersonalscoreContext } from 'src/contexts/personalscore.context'
import { AppContext } from 'src/contexts/app.context'
import { generateID } from 'src/utils/utils'

export default function PersonalInScore() {
  const { form,setForm } = useContext(PersonalscoreContext)
  const { profile } = useContext(AppContext)


  return (
    <div className='items-center justify-center py-10 bg-webColor200'>
      <div className='flex-col desktop:flex-row flex desktop:justify-between desktop:items-center space-y-4 desktop:space-y-0 desktop:space-x-8'>
        <div className=''>
          <ScoreSorting />
        </div>
      </div>
      <div className='container pb-4'>
        <div className='border h-9 border-transparent flex items-center py-4 text-lg desktop:text-xl font-bold text-darkText text-start '>
          <div className='w-1/4 text-left pr-4'> Tài Khoản </div>
        </div>
        <div className='border h-9 flex border-transparent items-center py-4 text-lg desktop:text-xl font-bold text-darkText text-start6 '>
          <div className='w-1/4 text-left pr-4'>Tên sinh viên: </div>
          <div className='border rounded-md border-transparent w-3/5 h-10 pt-2.5 px-4'>{profile?.name}</div>
        </div>
        <div className='border h-9 border-transparent flex items-center py-4 text-lg desktop:text-xl font-bold text-darkText text-start '>
          <div className='w-1/4 text-left pr-4'>Mã số sinh viên: </div>
          <div className='border rounded-md border-transparent w-3/5 h-10 pt-2.5 px-4'>{generateID(profile?._id || '')}</div>
          <button className='w-1/6 px-2 text-darkText h-10 ring-1 outline-none rounded-xl focus:ring-2 focus:ring-primaryText cursor-pointer hover:border-primaryBlue'
            onClick={() => setForm(!form)}>
            {!form && (
              <div>Theo biểu đồ</div>
            )}
            {form && (
              <div>Theo bảng</div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
