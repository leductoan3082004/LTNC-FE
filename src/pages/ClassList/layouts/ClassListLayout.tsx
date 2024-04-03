import PathBar from 'src/components/PathBar'
import { useContext, useState } from 'react'
import { ClassesContext } from 'src/contexts/classes.context'
import { Link } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

interface Video {
  id: number
  title: string
  url: string
  isActive: boolean
}

export default function ClassListLayout({ children }: Props) {
  const { classesPathList } = useContext(ClassesContext)

  // Mock data
  const videoList: Video[] = [
    {
      id: 1,
      title: 'SINH HOẠT SINH VIÊN',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isActive: true
    },
    {
      id: 2,
      title: 'KỸ THUẬT LẬP TRÌNH',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isActive: false
    },
    {
      id: 3,
      title: 'ANH VĂN CƠ BẢN',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isActive: true
    },
    {
      id: 4,
      title: 'BÓNG BÀN (HỌC PHÂN 2)',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isActive: false
    }
  ]

  const [selectedOption, setSelectedOption] = useState<string>('all')
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const filteredVideoList: Video[] = videoList
    .filter((video) => (selectedOption === 'all' && video.isActive) || (selectedOption === 'hidden' && !video.isActive))
    .filter((video) => video.title.toLowerCase().includes(searchKeyword.toLowerCase()))

  return (
    <div className='bg-[#e2e8f0] min-h-[100vh] py-4'>
      <div className='container flex flex-col bg-white py-6 min-h-[100vh]'>
        <div className='flex flex-col gap-2 pb-3 border-b title'>
          <h1 className='text-xl font-semibold'>KHÓA HỌC CỦA TÔI</h1>
          <h4 className='text-sm font-normal'>Tổng quan khóa học</h4>
        </div>

        <div className='flex items-center justify-start gap-1 my-4 select-search'>
          <select
            className='p-2 text-xs rounded-md border border-[#475569]'
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value='all'>Tất cả (Trừ khóa học đã ẩn)</option>
            <option value='hidden'>Khóa học đã ẩn</option>{' '}
          </select>
          <input
            type='text'
            placeholder='Tìm kiếm'
            className='p-2 text-xs rounded-md flex-grow border border-[#475569]'
            value={searchKeyword}
            onChange={handleInputChange}
          />
        </div>

        <div className='flex flex-col px-1 video gap-y-2'>
          <h4 className='text-sm font-normal title'>Danh sách khóa học</h4>
          <ul className='list-video'>
            {filteredVideoList.length > 0 ? (
              <ul className='list-video'>
                {filteredVideoList.map((video) => (
                  <li key={video.id} className='px-1 py-2 border-b-2 item'>
                    <Link to={video.url} className='text-sm font-medium text-[#2563eb]'>
                      {video.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-sm'>Không có video</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
