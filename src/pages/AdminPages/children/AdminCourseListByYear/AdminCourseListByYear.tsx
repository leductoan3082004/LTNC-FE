import { useQuery } from '@tanstack/react-query'
import courseApi from 'src/apis/course.api'
import LoadingSection from 'src/components/LoadingSection'
import useCourseListQueryConfig from 'src/hooks/useCourseListQueryConfig'
import { CourseListConfig } from 'src/types/course.type'
import AdminCourseCard from '../../components/AdminCourseCard'

interface Props {
  year: number
}

export default function AdminCourseListByYear({ year }: Props) {
  //! Get course list by year
  const startTimeStamp = new Date(year, 0).getTime() / 1000
  const endTimtStamp = new Date(year + 1, 0).getTime() / 1000
  const courseListConfig = useCourseListQueryConfig()
  //:: Get course list from current year
  const startYearConfig: CourseListConfig = {
    ...courseListConfig,
    end_time: startTimeStamp
  }
  const { data: startCourseListData, isFetched: startCourseListIsFetched } = useQuery({
    queryKey: ['admin_course_list', startYearConfig],
    queryFn: () => courseApi.getCourseList(startYearConfig)
  })
  const startCourseList = startCourseListData?.data.data || []

  //:: Get course list from the next year
  const endYearConfig: CourseListConfig = {
    ...courseListConfig,
    end_time: endTimtStamp
  }
  const { data: endCourseListData, isFetched: endCourseListIsFetched } = useQuery({
    queryKey: ['course_list', endYearConfig],
    queryFn: () => courseApi.getCourseList(endYearConfig)
  })
  const endCourseListId = endCourseListData?.data.data.map((course) => course._id) || []

  const currentCourseList = startCourseList.filter((course) => !endCourseListId.includes(course._id))

  return (
    <div className='w-full space-y-4'>
      <p className='font-medium uppercase text-xl text-center text-primaryText'>Năm học {year}</p>

      {(!startCourseListIsFetched || !endCourseListIsFetched) && <LoadingSection />}

      {startCourseListIsFetched && endCourseListIsFetched && (
        <div className='grid grid-cols-3 gap-4'>
          {currentCourseList.map((course) => (
            <div key={course._id} className='col-span-1'>
              <AdminCourseCard course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
