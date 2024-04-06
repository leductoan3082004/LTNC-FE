import classNames from 'classnames'
import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import { AdminCreateClassroomSchema } from 'src/rules/classroom.rule'
import { InputField } from 'src/types/utils.type'
import ErrorSection from '../ErrorSection'
import TimeSelector from 'src/components/TimeSelector'
import DayInWeekSelector from 'src/components/DayInWeekSelector'

type FormData = AdminCreateClassroomSchema

export default function AdminCreateClassroomForm() {
  //! Use form context
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext<FormData>()

  //! Form fields
  const fields: InputField[] = [
    {
      error: errors.course_id,
      errorMessage: errors.course_id?.message,
      name: 'course_id',
      title: 'ID khóa học',
      readonly: true
    },
    {
      error: errors.limit,
      errorMessage: errors.limit?.message,
      name: 'limit',
      title: 'Giới hạn thành viên'
    },
    {
      error: errors.weeks,
      errorMessage: errors.weeks?.message,
      name: 'weeks',
      title: 'Số tuần học'
    }
  ]

  //! Styles
  const inputFieldStyle = 'grid grid-cols-4 tablet:px-20 desktop:px-40 items-center gap-2 py-1 px-2'
  const titleStyle = 'text-xs col-span-1 tablet:text-sm font-medium space-x-1 uppercase lg:text-base '
  const inputStyle =
    'text-primaryText bg-white py-1 px-2 col-span-3 text-base lg:text-lg rounded-lg outline-none focus:outline-primaryText'

  return (
    <Fragment>
      {fields.map((field, index) => (
        <Input
          key={index}
          readOnly={field.readonly}
          className={inputFieldStyle}
          inputClassName={classNames(inputStyle, {
            'outline-red-600': Boolean(field.error)
          })}
          errorClassName='hidden'
          register={register}
          name={field.name}
          autoComplete='false'
          errorSection={<ErrorSection errorMessage={field.errorMessage} />}
        >
          <div className={titleStyle}>
            <span className='opacity-60'>{field.title}</span>
            <span className='text-alertRed text-lg'>*</span>
          </div>
        </Input>
      ))}

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className='opacity-60'>Giờ bắt đầu học</span>
          <span className='text-alertRed text-lg'>*</span>
        </div>
        <div className='text-primaryText py-1 col-span-3 text-base lg:text-lg rounded-lg outline-none focus:outline-primaryText'>
          <Controller
            control={control}
            name='lesson_start'
            render={({ field }) => (
              <TimeSelector errorMessage={errors.lesson_start?.message} value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className='opacity-60'>Giờ kết thúc</span>
          <span className='text-alertRed text-lg'>*</span>
        </div>
        <div className='text-primaryText py-1 col-span-3 text-base lg:text-lg rounded-lg outline-none focus:outline-primaryText'>
          <Controller
            control={control}
            name='lesson_end'
            render={({ field }) => (
              <TimeSelector errorMessage={errors.lesson_end?.message} value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className='opacity-60'>Ngày học trong tuần</span>
          <span className='text-alertRed text-lg'>*</span>
        </div>
        <div className='text-primaryText py-1 col-span-3 text-base lg:text-lg rounded-lg outline-none focus:outline-primaryText'>
          <Controller
            control={control}
            name='date'
            render={({ field }) => (
              <DayInWeekSelector
                errorMessage={errors.lesson_end?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}
