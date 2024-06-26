import { Fragment, useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'
import PersonalScoreSortingtByYear from '../../components/PersonalScoreSortingtByYear/PersonalScoreSortingtByYear'
import PersonalScoreSortingByYearColumn from '../../components/PersonalScoreSortingByYearColumn'
import PersonalInScore from '../../components/PersonalInScore'
import PersonalScoreSorting from '../../components/PersonalScoreSorting'
import { personalPath } from 'src/constants/path'
import { PersonalscoreContext } from 'src/contexts/personalscore.context'
import authApi from 'src/apis/auth.api'
import { reversedAcademicYears } from 'src/constants/academicYears'
import LoadingSection from 'src/components/LoadingSection'
import PersonalChangeFormBtn from '../../components/PersonalChangeFormBtn'

export default function PersonalScore() {
  const { setJoinedClassroomList, form } = useContext(PersonalscoreContext)

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
        <PersonalChangeFormBtn />
      </div>

      {!joinedClassroomListData && <LoadingSection />}

      {joinedClassroomListData && (
        <Fragment>
          {!form && (
            <div className='space-y-4'>
              {reversedAcademicYears.map((year, index) => (
                <PersonalScoreSortingtByYear key={index} year={year} />
              ))}
            </div>
          )}

          {form && (
            <div>
              {reversedAcademicYears.map((year, index) => (
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
        </Fragment>
      )}
    </div>
  )
}
