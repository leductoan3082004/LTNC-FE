import PersonalScoreSortingtByYear from '../../components/PersonalScoreSortingtByYear/PersonalScoreSortingtByYear'
import { useContext, useEffect } from 'react'
import authApi from 'src/apis/auth.api'
import { useQuery } from '@tanstack/react-query'
import { PersonalscoreContext } from 'src/contexts/personalscore.context'
import PersonalScoreSortingByYearColumn from '../../components/PersonalScoreSortingByYearColumn'
import PersonalInScore from '../../components/PersonalInScore'
import { NavLink } from 'react-router-dom'
import { personalPath } from 'src/constants/path'
import PersonalScoreSorting from '../../components/PersonalScoreSorting'
import academicYears from 'src/constants/academicYears'

export default function PersonalScore() {
  const { setJoinedClassroomList, form, setForm } = useContext(PersonalscoreContext)

  const { data: joinedClassroomListData } = useQuery({
    queryKey: ['joined_classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList()
  })
  const joinedClassroomList = joinedClassroomListData?.data.data

  useEffect(() => {
    if (joinedClassroomList) {
      setJoinedClassroomList(joinedClassroomList)
    }
  }, [joinedClassroomList, setJoinedClassroomList])

  return (
    <div className='space-y-4'>
      <div className=' bg-webColor200 justify-between items-end relative py-4'>
        <PersonalScoreSorting />
        <PersonalInScore />
        <button
          className='w-1/6 px-2 text-darkText py-2 rounded-xl bg-unhoverBg hover:bg-hoveringBg hover:border-primaryText absolute bottom-4 right-4'
          onClick={() => setForm(!form)}
        >
          {form ? 'Theo bảng' : 'Theo biểu đồ'}
        </button>
      </div>

      {!form && (
        <div className='space-y-4'>
          {academicYears.map((year, index) => (
            <PersonalScoreSortingtByYear key={index} year={year} />
          ))}
        </div>
      )}
      {form && (
        <div>
          {academicYears.map((year, index) => (
            <PersonalScoreSortingByYearColumn key={index} year={year} />
          ))}
          <div className='bg-webColor100 py-4 px-6 space-y-4 text-darkText'>
            <NavLink
              to={personalPath.scoreAllYear}
              className='py-2 flex justify-end items-center w-full hover:text-primaryText text-lg font-semibold shrink-0 underline'
            >
              Thống kê điểm theo năm học
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}
