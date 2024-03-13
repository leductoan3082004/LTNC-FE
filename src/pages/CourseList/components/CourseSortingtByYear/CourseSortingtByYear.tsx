import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { CourseContext } from 'src/contexts/course.context'

interface Props {
  year: number
}

export default function CourseSortingtByYear({ year }: Props) {
  const { setAcademicYear } = useContext(CourseContext)

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
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <button
              className='border-b last:border-none py-4 border-primaryText/80 hover:text-primaryText text-lg desktop:text-xl uppercase text-darkText text-start'
              key={index}
            >
              Lập trình nâng cao
            </button>
          ))}
      </div>
    </div>
  )
}
