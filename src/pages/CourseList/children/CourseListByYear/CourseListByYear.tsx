import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import courseApi from 'src/apis/course.api'
import LoadingSection from 'src/components/LoadingSection'
import mainPath from 'src/constants/path'
import { CourseContext } from 'src/contexts/course.context'
import useCourseListQueryConfig from 'src/hooks/useCourseListQueryConfig'
import { CourseListConfig } from 'src/types/course.type'
import CourseCard from '../../components/CourseCard'
import { getAcademicYearFromUrl } from 'src/utils/course.utils'

export default function CourseListByYear() {
  const { academicYear, setAcademicYear, setCoursePathList } = useContext(CourseContext)

  //! Get year from url
  const url = useLocation().pathname
  const yearFromUrl = getAcademicYearFromUrl(url)
  useEffect(() => {
    if (academicYear == '') {
      setAcademicYear(yearFromUrl)
    }
  }, [academicYear, setAcademicYear, yearFromUrl])

  //! Get course list by year
  const yearInt = parseInt(academicYear)
  const startTimeStamp = new Date(yearInt, 0).getTime() / 1000
  const endTimtStamp = new Date(yearInt + 1, 0).getTime() / 1000
  const courseListConfig = useCourseListQueryConfig()
  // Get course list from current year
  const startYearConfig: CourseListConfig = {
    ...courseListConfig,
    end_time: startTimeStamp
  }
  const { data: startCourseListData, isFetched: startListIsFetched } = useQuery({
    queryKey: ['course_list', startTimeStamp],
    queryFn: () => courseApi.getCourseList(startYearConfig),
    enabled: !isNaN(yearInt)
  })
  const startCourseList = startCourseListData?.data.data || []

  // Get course list from the next year
  const endYearConfig: CourseListConfig = {
    ...courseListConfig,
    end_time: endTimtStamp
  }
  const { data: endCourseListData, isFetched: endListIsFetched } = useQuery({
    queryKey: ['course_list', endTimtStamp],
    queryFn: () => courseApi.getCourseList(endYearConfig),
    enabled: !isNaN(yearInt)
  })
  const endCourseListId = endCourseListData?.data.data.map((course) => course._id) || []

  const currentCourseList = startCourseList.filter((course) => !endCourseListId.includes(course._id))

  //! SET PATH LIST
  useEffect(() => {
    setCoursePathList([
      { pathName: 'Khóa học', url: mainPath.courseList },
      { pathName: `Năm học ${academicYear}`, url: `${mainPath.courseList}/${academicYear}` }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearInt])

  return (
    <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
      <div className='py-2 flex justify-center items-center w-full tracking-widest text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '>
        {`Năm học: ${academicYear}`}
      </div>

      <div className='rounded-lg bg-white px-4 flex flex-col'>
        {!startListIsFetched && !endListIsFetched && <LoadingSection />}
        {startListIsFetched &&
          endListIsFetched &&
          currentCourseList.map((course) => <CourseCard key={course._id} course={course} />)}
      </div>
    </div>
  )
}
