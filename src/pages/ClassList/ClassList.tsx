import mainPath from 'src/constants/path'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateNameId } from 'src/utils/utils'
import { useQuery } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { JoinedClassroom } from 'src/types/joinedClassroom.type'

export default function ClassListLayout() {
  const { data: ClassRoomListData } = useQuery({
    queryKey: ['classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList()
  })
  const classroomList = ClassRoomListData?.data.data

  const [selectedOption, setSelectedOption] = useState<string>('all')
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value)
  }
  //handle click item
  const navigate = useNavigate()
  const handleClickItem = (classroom: JoinedClassroom) => () => {
    navigate({
      pathname: `${mainPath.classList}/${generateNameId({ name: classroom.course.course_name, id: classroom.class._id })}`
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  return (
    <div className='bg-mainBg min-h-[100vh] py-4'>
      <div className='container flex flex-col bg-webColor100 py-6 min-h-[100vh]'>
        <div className='flex flex-col gap-2 pb-3 border-b title'>
          <h1 className='text-2xl font-semibold'>KHÓA HỌC CỦA TÔI</h1>
          <h4 className='text-lg font-normal'>Tổng quan khóa học</h4>
        </div>

        <div className='flex items-center justify-start gap-1 my-4 select-search'>
          <select
            className='p-2 text-xs rounded-md border border-[#475569]'
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value='all'>Tất cả (Trừ khóa học đã ẩn)</option>{' '}
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
          <h4 className='text-lg font-normal title'>Danh sách khóa học</h4>
          <ul className='list-video'>
            {classroomList ? (
              <ul className='list-video'>
                {classroomList.map((classroom) => (
                  <li key={classroom.class._id} className='px-1 py-2 border-b border-black item'>
                    <button onClick={handleClickItem(classroom)} className='text-lg font-medium text-blue-800'>
                      {classroom.course.course_name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-lg'>Không có lớp học</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
