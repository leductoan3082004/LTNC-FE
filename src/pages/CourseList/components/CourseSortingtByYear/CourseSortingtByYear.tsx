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
      <div className='px-8 tablet:px-16 desktop:px-32 '>
        <div className='border-t-2 border-primaryText'></div>
      </div>
      <div className=''>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div className='border-b last:border-none py-4 border-primaryText/80' key={index}>
              <button className='w-full text-start text-lg desktop:text-xl uppercase text-darkText hover:text-primaryText'>
                Lập trình nâng cao
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}
