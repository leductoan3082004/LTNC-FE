import PersonalScoreSortingtByYear from '../../components/PersonalScoreSortingtByYear/PersonalScoreSortingtByYear'
import { useContext, useEffect, useState } from 'react'
import authApi from 'src/apis/auth.api'
import { useQuery } from '@tanstack/react-query'
import { PersonalscoreContext } from 'src/contexts/personalscore.context'
import PersonalScoreSortingByYearColumn from '../../components/PersonalScoreSortingByYearColumn'
import PersonalInScore from '../../components/PersonalInScore'

export default function PersonalScore() {
  const { setJoinedClassroomList, form} = useContext(PersonalscoreContext)

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
      
      <div>
        <PersonalInScore />
        {!form && (
          <div>
            <PersonalScoreSortingtByYear year={2024} />
            <PersonalScoreSortingtByYear year={2025} />
            <PersonalScoreSortingtByYear year={2026} />
            <PersonalScoreSortingtByYear year={2027} />
          </div>
        )}
        {form && (
          <div>
            <PersonalScoreSortingByYearColumn year={2024} />
            <PersonalScoreSortingByYearColumn year={2025} />
          </div>
        )}
      </div>
  )
}
