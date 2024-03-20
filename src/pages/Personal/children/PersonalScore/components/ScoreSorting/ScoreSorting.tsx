import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { range } from 'lodash'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {personalPath} from 'src/constants/path'
import { PersonalscoreContext } from 'src/contexts/personalscore.context' 

export default function ScoreSorting() {
  const { academicYear, setAcademicYear } = useContext(PersonalscoreContext)

  //! HANDLE SELECT YEAR
  const navigate = useNavigate()
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelector } = event.target
    setAcademicYear(valueFromSelector)
    navigate({ pathname: `${personalPath.score}/${valueFromSelector}` })
  }

  return (
    <div className='space-x-2 flex text-darkText rounded-lg py-2 px-6 bg-webColor200'>
      <span className='uppercase font-medium text-lg shrink-0 items-center flex'>Lọc theo năm học:</span>

      <label className='relative '>
        <span className='absolute top-1/2 right-2 -translate-y-1/2 text-primaryText pointer-events-none'>
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
        <select
          onChange={handleChange}
          name='year'
          className='px-4 text-primaryText h-10 appearance-none w-full ring-1 outline-none ring-primaryTextUnHover rounded-xl focus:ring-2 focus:ring-primaryText cursor-pointer hover:border-primaryBlue'
          value={academicYear}
        >
          <option disabled className='uppercase text-lg font-semibold'>
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