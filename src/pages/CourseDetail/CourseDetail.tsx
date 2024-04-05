import { Fragment, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingRing from 'src/components/LoadingRing'
import mainPath from 'src/constants/path'
import { CourseContext } from 'src/contexts/course.context'
import CourseDescription from './components/CourseDescription'
import { getYearFromUrlInCourseDetailUrl } from 'src/utils/course.utils'
import { useQuery } from '@tanstack/react-query'
import { getIdFromUrl } from 'src/utils/utils'
import courseApi from 'src/apis/course.api'
import CourseDetailClassroomList from './children/CourseDetailClassroomList'

export default function CourseDetail() {
  const { academicYear, setAcademicYear, setCoursePathList } = useContext(CourseContext)

  const url = useLocation().pathname

  //! Get academic year
  const year = getYearFromUrlInCourseDetailUrl(url)

  useEffect(() => {
    if (academicYear == '') {
      setAcademicYear(year)
    }
  }, [academicYear, setAcademicYear, year])

  //! Get course detail
  const courseId = getIdFromUrl(url)
  const { data: courseDetailData } = useQuery({
    queryKey: ['course_detail', courseId],
    queryFn: () => courseApi.getCourseById(courseId)
  })
  const courseDetail = courseDetailData?.data.data

  //! SET PATH LIST
  useEffect(() => {
    setCoursePathList([
      { pathName: 'Khóa học', url: mainPath.courseList },
      { pathName: `Năm học ${academicYear}`, url: `${mainPath.courseList}/${academicYear}` },
      { pathName: courseDetail?.course_name || '', url: url }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDetail])

  return (
    <Fragment>
      {!courseDetail && (
        <div className='h-[50vh] w-full flex flex-col items-center justify-center'>
          <LoadingRing />
          <div className='text-xl font-medium uppercase opacity-80'>Đang lấy thông tin khóa học</div>
        </div>
      )}
      {courseDetail && (
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-7'>
            <CourseDescription course={courseDetail} />
          </div>
          <div className='col-span-5'>
            <CourseDetailClassroomList course={courseDetail} />
          </div>
        </div>
      )}
    </Fragment>
  )
}
