import CourseSorting from '../../components/CourseSorting'
import CourseSearchingBar from '../../components/CourseSearchingBar'
import PathBar from 'src/components/PathBar'
import { useContext } from 'react'
import { CourseContext } from 'src/contexts/course.context'

interface Props {
  children?: React.ReactNode
}

export default function CourseListLayout({ children }: Props) {
  const { coursePathList } = useContext(CourseContext)

  return (
    <div className='bg-mainBg py-4 desktop:py-8'>
      <div className='container'>
        <PathBar pathList={coursePathList} />

        <div className='flex-col desktop:flex-row flex desktop:justify-between desktop:items-center space-y-4 desktop:space-y-0 desktop:space-x-8'>
          <div className=''>
            <CourseSorting />
          </div>
          <div className='w-full tablet:w-6/12 desktop:w-4/12'>
            <CourseSearchingBar />
          </div>
        </div>

        <div className='py-8'>{children}</div>
      </div>
    </div>
  )
}