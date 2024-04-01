import PathBar from 'src/components/PathBar'
import { useContext } from 'react'
import { ClassesContext } from 'src/contexts/classes.context'

interface Props {
  children?: React.ReactNode
}

export default function ClassListLayout({ children }: Props) {
    const { classesPathList } = useContext(ClassesContext)
    
    return (
        <div className='py-4 bg-mainBg desktop:py-8'>
      <div className='container flex flex-wrap bg-gray-50'>
        <span className="flex flex-col font-['Inter'] text-[25px] font-bold leading-[30.256px] text-black relative text-left whitespace-nowrap z-[26] mt-[27px] mr-0 mb-0 ml-[27px]">
        KHÓA HỌC CỦA TÔI
        </span>
        <span className="flex flex-col font-['Inter'] text-[20px] font-normal leading-[30.256px] text-black relative text-left whitespace-nowrap z-[26] mt-[27px] mr-0 mb-0 ml-[27px]">
        TỔNG QUAN KHÓA HỌC
        </span>
      </div>


    </div>
    )
    }

