import React from 'react'
import CourseSearchingBar from './components/CourseSearchingBar'
import CourseSorting from './components/CourseSorting'

export default function CourseList() {
  return (
    <div className='bg-mainBg py-4 desktop:py-8'>
      <div className='container'>
        <div className='flex-col desktop:flex-row flex desktop:justify-between desktop:items-center space-y-4 desktop:space-y-0 desktop:space-x-8'>
          <div className=''>
            <CourseSorting />
          </div>
          <div className='w-full tablet:w-6/12 desktop:w-4/12'>
            <CourseSearchingBar />
          </div>
        </div>

        <div className='mt-8 rounded-lg bg-webColor100 h-80'></div>
      </div>
    </div>
  )
}
