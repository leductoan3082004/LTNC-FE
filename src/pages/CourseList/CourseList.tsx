import { useContext, useEffect } from 'react'
import CourseSortingtByYear from './components/CourseSortingtByYear'
import { CourseContext } from 'src/contexts/course.context'
import mainPath from 'src/constants/path'

export default function CourseList() {
  const { setCoursePathList } = useContext(CourseContext)

  //! SET PATH LIST
  useEffect(() => {
    setCoursePathList([{ pathName: 'Khóa học', url: mainPath.courseList }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='space-y-8'>
      <CourseSortingtByYear year={2024} />
      <CourseSortingtByYear year={2025} />
      <CourseSortingtByYear year={2026} />
      <CourseSortingtByYear year={2027} />
    </div>
  )
}
