import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { CourseContext } from 'src/contexts/course.context'
import { Course } from 'src/types/course.type'
import { generateCourseId } from 'src/utils/course.utils'

interface Props {
  course: Course
  year: number
}

export default function CourseCard({ course, year }: Props) {
  //! Use hooks
  const { setAcademicYear } = useContext(CourseContext)
  const navigate = useNavigate()

  const chooseCourse = () => {
    setAcademicYear(year.toString())
    navigate({
      pathname: `${mainPath.courseList}/${year}/${generateCourseId({ course: course.course_name, id: course._id })}`
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
