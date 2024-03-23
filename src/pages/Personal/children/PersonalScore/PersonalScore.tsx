import ScoreSortingtByYear from './components/ScoreSortingByYear/ScoreSortingByYear'
import ScoreSorting from './components/ScoreSorting'

export default function PersonalScore() {
  return (
    <div className='items-center justify-center py-10 bg-webColor200'>
      <div className='flex-col desktop:flex-row flex desktop:justify-between desktop:items-center space-y-4 desktop:space-y-0 desktop:space-x-8'>
        <div className=''>
          <ScoreSorting />
        </div>
      </div>
      <div className='container'>
        <div className='border h-9 border-transparent flex items-center py-4 text-lg desktop:text-xl font-bold text-darkText text-start '>
          <div className='w-1/4 text-left pr-4'> Tài Khoản </div>
        </div>
        <div className='border h-9 flex border-transparent items-center py-4 text-lg desktop:text-xl font-bold text-darkText text-start6 '>
          <div className='w-1/4 text-left pr-4'>Tên sinh viên: </div>
          <div className='border rounded-md border-transparent w-3/5 h-10 pt-2.5 px-4'>Dungdo</div>
        </div>
        <div className='border h-9 border-transparent flex items-center py-4 text-lg desktop:text-xl font-bold text-darkText text-start '>
          <div className='w-1/4 text-left pr-4'>Mã số sinh viên: </div>
          <div className='border rounded-md border-transparent w-3/5 h-10 pt-2.5 px-4'>2217749</div>
        </div>
      </div>
      <ScoreSortingtByYear year={2024} />
      <ScoreSortingtByYear year={2025} />
      <ScoreSortingtByYear year={2026} />
      <ScoreSortingtByYear year={2027} />
    </div>
  )
}
