import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { range } from 'lodash'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { CourseContext } from 'src/contexts/course.context'
// import './CourseSorting.css'

export default function CourseSorting() {
  const { academicYear, setAcademicYear } = useContext(CourseContext)

  //! HANDLE SELECT YEAR
  const navigate = useNavigate()
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelector } = event.target
    setAcademicYear(valueFromSelector)
    navigate({ pathname: `${mainPath.courseList}/${valueFromSelector}` })
  }

  return (
    <div className='flex px-6 py-2 space-x-2 rounded-lg text-darkText bg-webColor200'>
      <span className='flex items-center text-lg font-medium uppercase shrink-0'>Lọc theo năm học:</span>

      <label className='relative '>
        <span className='absolute -translate-y-1/2 pointer-events-none top-1/2 right-2 text-primaryText'>
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
        <select
          onChange={handleChange}
          name='year'
          className='w-full h-10 px-4 outline-none appearance-none cursor-pointer text-primaryText ring-1 ring-primaryTextUnHover rounded-xl focus:ring-2 focus:ring-primaryText hover:border-primaryBlue'
          value={academicYear}
        >
          <option disabled className='text-lg font-semibold uppercase'>
            Năm học
          </option>
          {range(2024, 2028).map((year) => (
            <option value={year} key={year} className='text-darkText/80'>
              {year}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
