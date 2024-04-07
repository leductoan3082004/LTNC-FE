import moment from 'moment'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { CourseContext } from 'src/contexts/course.context'
import { Course } from 'src/types/course.type'
import { generateCourseId } from 'src/utils/course.utils'

interface Props {
  course: Course
}

export default function CourseCard({ course }: Props) {
  //! Use hooks
  const { setAcademicYear } = useContext(CourseContext)
  const navigate = useNavigate()

  //! Get acadeic year
  const academicYear = moment(course.end_time).year()

  const chooseCourse = () => {
    setAcademicYear(academicYear.toString())
    navigate({
      pathname: `${mainPath.courseList}/${academicYear}/${generateCourseId({ course: course.course_name, id: course._id })}`
    })
  }

  return (
    <button
      onClick={chooseCourse}
      className='py-4 group border-b last:border-none border-primaryText/80 text-darkText flex w-full items-center justify-between'
    >
      <span className='font-medium group-hover:text-primaryText text-lg uppercase desktop:text-xl'>
        {course.course_name}
      </span>
      <div className='flex opacity-60 space-x-2'>
        <span>Số tín chỉ:</span>
        <span>{course.credit}</span>
      </div>
    </button>
  )
}
