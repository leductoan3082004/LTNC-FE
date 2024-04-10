import PersonalScoreSortingtByYear from '../../components/PersonalScoreSortingtByYear/PersonalScoreSortingtByYear'
import { useContext, useEffect} from 'react'
import authApi from 'src/apis/auth.api'
import { useQuery } from '@tanstack/react-query'
import { PersonalscoreContext } from 'src/contexts/personalscore.context'
import PersonalScoreSortingByYearColumn from '../../components/PersonalScoreSortingByYearColumn'
import PersonalInScore from '../../components/PersonalInScore'
import { NavLink } from 'react-router-dom'
import { personalPath } from 'src/constants/path'

export default function PersonalScore() {
  const { setJoinedClassroomList, form } = useContext(PersonalscoreContext)

  const { data: joinedClassroomListData } = useQuery({
    queryKey: ['joined_classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList(),
  })
  const joinedClassroomList = joinedClassroomListData?.data.data



  useEffect(() => {
    if (joinedClassroomList) {
      setJoinedClassroomList(joinedClassroomList)
    }
  }, [joinedClassroomList, setJoinedClassroomList])
  
  return (

    <div>
      <PersonalInScore />
      {!form && (
        <div>
          <PersonalScoreSortingtByYear year={2023} />
          <PersonalScoreSortingtByYear year={2024} />
        </div>
      )}
      {form && (
        <div>
          <PersonalScoreSortingByYearColumn year={2023} />
          <PersonalScoreSortingByYearColumn year={2024} />
          <div className='bg-webColor100 py-4 px-6 space-y-4 text-darkText'>
            <NavLink
            to={personalPath.scoreAllYear}
              className='py-2 flex justify-end items-center w-full hover:text-primaryText text-lg font-semibold shrink-0 '>
              Thống kê điểm theo năm học
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}
