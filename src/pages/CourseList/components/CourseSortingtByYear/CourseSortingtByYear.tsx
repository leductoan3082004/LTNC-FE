import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { CourseContext } from 'src/contexts/course.context'
import { generateCourseId } from 'src/utils/course.utils'

interface Props {
  year: number
}

export default function CourseSortingtByYear({ year }: Props) {
  const { setAcademicYear } = useContext(CourseContext)

  const navigate = useNavigate()
  //! HANDLE CHOOSE YEAR
  const handleSelectYear = () => {
    setAcademicYear(year.toString())
    navigate({ pathname: `${mainPath.courseList}/${year}` })
  }

  //! HANDLE CHOOSE COURSE
  const chooseCourse = (courseName: string, id: string) => () => {
    setAcademicYear(year.toString())
    navigate({ pathname: `${mainPath.courseList}/${year}/${generateCourseId({ course: courseName, id: id })}` })
  }

  return (
    <div className='px-6 py-4 space-y-4 rounded-lg bg-webColor100 text-darkText'>
      <button
        onClick={handleSelectYear}
        className='flex items-center justify-center w-full py-2 text-lg font-semibold uppercase hover:text-primaryText desktop:text-2xl shrink-0 '
      >
        {`Năm học: ${year}`}
      </button>
      <div className='flex justify-center w-full'>
        <div className='w-6/12 border-t-2 border-primaryText desktop:w-4/12'></div>
      </div>
      <div className='flex flex-col'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <button
              onClick={chooseCourse(`Lập trình nâng cao 0${index}`, `${index}`)}
              className='py-4 text-lg uppercase border-b last:border-none border-primaryText/80 hover:text-primaryText desktop:text-xl text-darkText text-start'
              key={index}
            >
              Lập trình nâng cao
            </button>
          ))}
      </div>
    </div>
  )
}
