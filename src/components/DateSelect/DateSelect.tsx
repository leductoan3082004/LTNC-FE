import { range } from 'lodash'
import React, { useState } from 'react'

interface Props {
  errorMessage?: string
  onChange?: (date: Date) => void
  value?: Date
  errorClassName?: string
}

const toDay = new Date()

export default function DateSelect({
  value,
  onChange,
  errorMessage,
  errorClassName = 'mt-0.5 text-alertRed min-h-[1rem] text-xs'
}: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || toDay.getDate(),
    month: value?.getMonth() || toDay.getMonth(),
    year: value?.getFullYear() || toDay.getFullYear()
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelector, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelector)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className=''>
      <div className={errorClassName} />
      <div className='flex justify-between w-full space-x-1 tablet:space-x-2'>
        <select
          onChange={handleChange}
          name='date'
          className='h-10 w-4/12 rounded-sm border border-black/20 cursor-pointer hover:border-primaryBlue'
          value={value?.getDate() || date.date}
        >
          <option disabled className='font-medium'>
            Ngày
          </option>
          {range(1, 32).map((day) => (
            <option value={day} key={day} className=''>
              {day}
            </option>
          ))}
        </select>
        <select
          onChange={handleChange}
          name='month'
          className='h-10 w-4/12 rounded-sm border border-black/20 cursor-pointer hover:border-primaryBlue'
          value={value?.getMonth() || date.month}
        >
          <option disabled className='font-medium'>
            Tháng
          </option>
          {range(0, 12).map((month) => (
            <option value={month} key={month} className=''>
              {month + 1}
            </option>
          ))}
        </select>
        <select
          onChange={handleChange}
          name='year'
          className='h-10 w-4/12 rounded-sm border border-black/20 cursor-pointer hover:border-primaryBlue'
          value={value?.getFullYear() || date.year}
        >
          <option disabled className='font-medium'>
            Năm
          </option>
          {range(2023, 2031).map((year) => (
            <option value={year} key={year} className=''>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className={errorClassName}>{errorMessage}</div>
    </div>
  )
}
