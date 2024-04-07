import { range } from 'lodash'
import React, { useState } from 'react'

interface Props {
  errorMessage?: string
  onChange?: (hour: number) => void
  value?: number
  errorClassName?: string
}

export default function TimeSelector({
  value,
  onChange,
  errorMessage,
  errorClassName = 'mt-0.5 text-alertRed min-h-[1rem] text-xs'
}: Props) {
  const [hour, setHour] = useState<number>(6)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const newHour = Number(value)
    setHour(newHour)
    onChange && onChange(newHour)
  }

  return (
    <div className=''>
      <div className={errorClassName} />
      <div className='flex justify-between w-full space-x-1 tablet:space-x-2'>
        <select
          onChange={handleChange}
          name='date'
          className='h-10 w-4/12 rounded-sm border border-black/20 cursor-pointer hover:border-primaryBlue'
          value={value || hour}
        >
          <option disabled className='font-medium'>
            Giờ
          </option>
          {range(1, 25).map((hour) => (
            <option value={hour} key={hour} className=''>
              {hour}
            </option>
          ))}
        </select>
      </div>
      <div className={errorClassName}>{errorMessage}</div>
    </div>
  )
}
