import { range } from 'lodash'
import React, { useState } from 'react'
import DaysInWeekEnum from 'src/constants/daysInWeek'

interface Props {
  errorMessage?: string
  onChange?: (date: Date) => void
  value?: Date
  errorClassName?: string
}

const toDay = new Date()

export default function DayInWeekSelector({
  value,
  onChange,
  errorMessage,
  errorClassName = 'mt-0.5 text-alertRed min-h-[1rem] text-xs'
}: Props) {
  const [tempDate, setTempDate] = useState({
    date: value?.getDate() || toDay.getDate(),
    month: value?.getMonth() || toDay.getMonth(),
    year: value?.getFullYear() || toDay.getFullYear()
  })
  const [date, setDate] = useState<Date>(toDay)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelector, name } = event.target
    const newTempDate = {
      date: value?.getDate() || tempDate.date,
      month: value?.getMonth() || tempDate.month,
      year: value?.getFullYear() || tempDate.year,
      [name]: Number(valueFromSelector)
    }
    setTempDate(newTempDate)
    const newDate = new Date(newTempDate.year, newTempDate.month, newTempDate.date)
    setDate(newDate)
    onChange && onChange(newDate)
  }

  return (
    <div className=''>
      <div className={errorClassName} />
      <div className='flex space-x-1 desktop:text-lg'>
        <span className='font-semibold text-primaryText'>{DaysInWeekEnum[date.getDay()]}</span>
        <span>hàng tuần</span>
      </div>
      <div className='flex justify-between w-full space-x-1 tablet:space-x-2'>
        <select
          onChange={handleChange}
          name='date'
          className='h-10 w-4/12 rounded-sm border border-black/20 cursor-pointer hover:border-primaryBlue'
          value={value?.getDate() || tempDate.date}
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
          value={value?.getMonth() || tempDate.month}
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
          value={value?.getFullYear() || tempDate.year}
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
