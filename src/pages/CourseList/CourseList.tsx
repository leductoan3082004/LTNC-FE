import { Fragment, useContext, useEffect } from 'react'
import CourseSortingtByYear from './components/CourseSortingtByYear'
import { CourseContext } from 'src/contexts/course.context'
import mainPath from 'src/constants/path'
import useCourseListQueryConfig from 'src/hooks/useCourseListQueryConfig'
import { useQuery } from '@tanstack/react-query'
import courseApi from 'src/apis/course.api'
import CourseCard from './components/CourseCard'
import { reversedAcademicYears } from 'src/constants/academicYears'

export default function CourseList() {
  const { setCoursePathList } = useContext(CourseContext)

  //! Get course by config
  const courseListConfig = useCourseListQueryConfig()
  const { query } = courseListConfig
  const { data: courseListData } = useQuery({
    queryKey: ['course_list', courseListConfig],
    queryFn: () => courseApi.getCourseList(courseListConfig)
  })
  const courseList = courseListData?.data.data || []

  //! SET PATH LIST
  useEffect(() => {
    document.title = 'Khóa học'
    setCoursePathList([{ pathName: 'Khóa học', url: mainPath.courseList }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='space-y-8'>
      {query && query != '' && (
        <div className='w-full space-y-6'>
          <p className='flex space-x-2 p-2 rounded-lg bg-webColor100'>
            <span className='opacity-60'>Kết quả tìm kiếm cho:</span>
            <span className=''>{`"${query}"`}</span>
          </p>
          <div className='p-4 rounded-lg  bg-webColor100'>
            {courseList.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      )}
      {(!query || query == '') && (
        <Fragment>
          {reversedAcademicYears.map((year, index) => (
            <CourseSortingtByYear key={index} year={year} />
          ))}
        </Fragment>
      )}
    </div>
  )
}
