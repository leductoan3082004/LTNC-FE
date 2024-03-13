import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSection from 'src/components/LoadingSection'
import mainPath from 'src/constants/path'
import { CourseContext } from 'src/contexts/course.context'

const boo = false

export default function CourseListByYear() {
  const { academicYear, setCoursePathList } = useContext(CourseContext)

  //! SET PATH LIST
  useEffect(() => {
    setCoursePathList([
      { pathName: 'Khóa học', url: mainPath.courseList },
      { pathName: `Năm học ${academicYear}`, url: `${mainPath.courseList}/${academicYear}` }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //! HANDLE CHOOSE COURSE
  const navigate = useNavigate()
  const chooseCourse = (courseName: string) => () => {
    navigate({ pathname: `${mainPath.courseList}/${academicYear}/${courseName}` })
  }

  return (
    <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
      <div className='py-2 flex justify-center items-center w-full text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '>
        {`Năm học: ${academicYear}`}
      </div>

      <div className='rounded-lg bg-white px-4 flex flex-col'>
        {boo && <LoadingSection />}
        {!boo &&
          Array(5)
            .fill(0)
            .map((_, index) => (
              <button
                onClick={chooseCourse(index.toString())}
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
