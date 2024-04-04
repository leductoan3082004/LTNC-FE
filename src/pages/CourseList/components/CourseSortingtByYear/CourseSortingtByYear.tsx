import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import courseApi from 'src/apis/course.api'
import mainPath from 'src/constants/path'
import { CourseContext } from 'src/contexts/course.context'
import useCourseListQueryConfig from 'src/hooks/useCourseListQueryConfig'
import { CourseListConfig } from 'src/types/course.type'
import CourseCard from '../CourseCard'

interface Props {
  year: number
}

export default function CourseSortingtByYear({ year }: Props) {
  const { setAcademicYear } = useContext(CourseContext)

  const startTimeStamp = new Date(year, 0).getTime() / 1000
  const endTimtStamp = new Date(year + 1, 0).getTime() / 1000

  //! Get course list by year
  const courseListConfig = useCourseListQueryConfig()
  // Get course list from current year
  const startYearConfig: CourseListConfig = {
    ...courseListConfig,
    end_time: startTimeStamp
  }
  const { data: startCourseListData } = useQuery({
    queryKey: ['course_list', startTimeStamp],
    queryFn: () => courseApi.getCourseList(startYearConfig)
  })
  const startCourseList = startCourseListData?.data.data || []

  // Get course list from the next year
  const endYearConfig: CourseListConfig = {
    ...courseListConfig,
    end_time: endTimtStamp
  }
  const { data: endCourseListData } = useQuery({
    queryKey: ['course_list', endTimtStamp],
    queryFn: () => courseApi.getCourseList(endYearConfig)
  })
  const endCourseListId = endCourseListData?.data.data.map((course) => course._id) || []

  const currentCourseList = startCourseList.filter((course) => !endCourseListId.includes(course._id))

  //! HANDLE CHOOSE YEAR
  const navigate = useNavigate()
  const handleSelectYear = () => {
    setAcademicYear(year.toString())
    navigate({ pathname: `${mainPath.courseList}/${year}` })
  }

  return (
    <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
      <button
        onClick={handleSelectYear}
        className='py-2 flex justify-center items-center w-full hover:text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '
      >
        {`Năm học: ${year}`}
      </button>
      <div className='w-full flex justify-center'>
        <div className='border-t-2 border-primaryText w-6/12 desktop:w-4/12'></div>
      </div>
      <div className='flex flex-col'>
        {currentCourseList.map((course) => (
          <div key={course._id} className='border-b last:border-none border-primaryText/80'>
            <CourseCard course={course} year={year} />
          </div>
        ))}
      </div>
    </div>
  )
}
