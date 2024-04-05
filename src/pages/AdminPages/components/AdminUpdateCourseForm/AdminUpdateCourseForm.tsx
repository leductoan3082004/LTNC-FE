import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CustomJoditEditor from 'src/components/CustomJoditEditor'
import Input from 'src/components/Input'
import { AdminUpdateCourseSchema } from 'src/rules/course.rule'
import { Course } from 'src/types/course.type'
import { InputField } from 'src/types/utils.type'
import ErrorSection from '../ErrorSection'
import classNames from 'classnames'
import DateSelect from 'src/components/DateSelect'

type FormData = AdminUpdateCourseSchema

interface Props {
  course: Course
}

export default function AdminUpdateCourseForm({ course }: Props) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<FormData>()

  //! EDIT DESCRIPTION
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditorStateChange = (editorState: any) => {
    setValue('description', editorState)
  }
  const editorContent = watch('description')

  //! Form
  const fields: InputField[] = [
    {
      error: errors.course_name,
      errorMessage: errors.course_name?.message,
      name: 'course_name',
      title: 'Tên khóa học'
    },
    {
      error: errors.credit,
      errorMessage: errors.credit?.message,
      name: 'credit',
      title: 'Số tín chỉ'
    },
    {
      error: errors.limit,
      errorMessage: errors.limit?.message,
      name: 'limit',
      title: 'Số lớp'
    },
    {
      error: errors.attendance_ratio,
      errorMessage: errors.attendance_ratio?.message,
      name: 'attendance_ratio',
      title: '% điểm chuyên cần'
    },
    {
      error: errors.lab_ratio,
      errorMessage: errors.lab_ratio?.message,
      name: 'lab_ratio',
      title: '% điểm lab'
    },
    {
      error: errors.midterm_ratio,
      errorMessage: errors.midterm_ratio?.message,
      name: 'midterm_ratio',
      title: '% điểm thi giữa kì'
    },
    {
      error: errors.final_ratio,
      errorMessage: errors.final_ratio?.message,
      name: 'final_ratio',
      title: '% điểm thi cuối kì'
    }
  ]

  //! Styles
  const inputFieldStyle = 'grid grid-cols-4 tablet:px-20 desktop:px-40 items-center gap-2 py-1 px-2'
  const titleStyle = 'text-xs col-span-1 tablet:text-sm font-medium space-x-1 uppercase lg:text-base '
  const inputStyle =
    'text-primaryText bg-white py-1 px-2 col-span-3 text-base lg:text-lg rounded-lg outline-none focus:outline-primaryText'

  return (
    <Fragment>
      <div className={classNames(inputFieldStyle, 'mb-6')}>
        <div className={titleStyle}>
          <span className='opacity-60'>ID khóa học</span>
          <span className='text-alertRed text-lg'>*</span>
        </div>
        <div className={inputStyle}>{course._id}</div>
      </div>

      {fields.map((field, index) => (
        <Input
          key={index}
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
          <span className='opacity-60'>Ngày mở đăng kí</span>
          <span className='text-alertRed text-lg'>*</span>
        </div>
        <div className={inputStyle}>
          <Controller
            control={control}
            name='start_time'
            render={({ field }) => (
              <DateSelect errorMessage={errors.start_time?.message} value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className='opacity-60'>Ngày kết thúc đăng kí</span>
          <span className='text-alertRed text-lg'>*</span>
        </div>
        <div className={inputStyle}>
          <Controller
            control={control}
            name='end_time'
            render={({ field }) => (
              <DateSelect errorMessage={errors.end_time?.message} value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className='space-y-4 px-2'>
        <div className='flex space-x-2'>
          <div className={titleStyle}>
            <span className='opacity-60'>Mô tả khóa học</span>
            <span className='text-alertRed text-lg'>*</span>
          </div>
          <span className='text-sm text-alertRed'>{errors.description?.message}</span>
        </div>
        {/* <QuillEditor value={editorContent} setValue={onEditorStateChange} /> */}
        <CustomJoditEditor content={editorContent} setContent={onEditorStateChange} />
      </div>
    </Fragment>
  )
}
