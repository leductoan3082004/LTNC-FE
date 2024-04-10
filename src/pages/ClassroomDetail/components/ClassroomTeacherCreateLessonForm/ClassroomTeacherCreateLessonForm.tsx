import classNames from 'classnames'
import { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import CustomJoditEditor from 'src/components/CustomJoditEditor'
import Input from 'src/components/Input'
import ErrorSection from 'src/pages/AdminPages/components/ErrorSection'
import { CreateLessonSchema } from 'src/rules/classroom.rule'
import { InputField } from 'src/types/utils.type'

type FormData = CreateLessonSchema

export default function ClassroomTeacherCreateLessonForm() {
  //! Use form context
  const {
    setValue,
    register,
    watch,
    formState: { errors }
  } = useFormContext<FormData>()

  //! Form fields
  const fields: InputField[] = [
    {
      error: errors.classroom_id,
      errorMessage: errors.classroom_id?.message,
      name: 'classroom_id',
      title: 'ID lớp học',
      readonly: true
    },
    {
      error: errors.name,
      errorMessage: errors.name?.message,
      name: 'name',
      title: 'Tên bài giảng'
    }
  ]

  //! EDIT DESCRIPTION
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditorStateChange = (editorState: any) => {
    setValue('content', editorState)
  }
  const editorContent = watch('content')

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

      <div className='space-y-4 px-2'>
        <div className='flex space-x-2'>
          <div className={classNames(titleStyle, 'justify-center flex w-full')}>
            <span className='opacity-60'>Nội dung bài giảng</span>
            <span className='text-alertRed text-lg'>*</span>
          </div>
          <span className='text-sm text-alertRed'>{errors.content?.message}</span>
        </div>
        <CustomJoditEditor content={editorContent} setContent={onEditorStateChange} />
      </div>
    </Fragment>
  )
}
