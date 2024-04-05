import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LoadingRing from 'src/components/LoadingRing'
import { AdminUpdateCourseSchema, adminUpdateCourseSchema } from 'src/rules/course.rule'
import { ErrorRespone } from 'src/types/utils.type'
import AdminUpdateCourseForm from '../AdminUpdateCourseForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import courseApi from 'src/apis/course.api'
import { formatTimeToSeconds, isAxiosBadRequestError } from 'src/utils/utils'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import DialogPopup from 'src/components/DialogPopup'
import { Course } from 'src/types/course.type'

type FormData = AdminUpdateCourseSchema

interface Props {
  currentCourse: Course
  setEditingMode: Dispatch<SetStateAction<boolean>>
}

const currentDate = new Date()

export default function AdminUpdateCourse({ currentCourse, setEditingMode }: Props) {
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  //! Handle form
  const [startTime, setStartTime] = useState<Date>(new Date(currentCourse.start_time))
  const [endTime, setEndTime] = useState<Date>(new Date(currentCourse.end_time))
  const methods = useForm<FormData>({
    resolver: yupResolver(adminUpdateCourseSchema)
  })
  const { handleSubmit, setValue, reset } = methods

  useEffect(() => {
    if (currentCourse) {
      setValue('course_id', currentCourse._id)
      setValue('course_name', currentCourse.course_name)
      setValue('credit', currentCourse.credit)
      setValue('limit', currentCourse.limit)
      setValue('description', currentCourse.description)
      setValue('attendance_ratio', currentCourse.attendance_ratio)
      setValue('lab_ratio', currentCourse.lab_ratio)
      setValue('midterm_ratio', currentCourse.midterm_ratio)
      setValue('final_ratio', currentCourse.final_ratio)
      setValue('start_time', new Date(currentCourse.start_time))
      setValue('end_time', new Date(currentCourse.end_time))
    }
  }, [currentCourse, setValue])

  useEffect(() => {
    setValue('start_time', startTime)
  }, [startTime, setValue])
  useEffect(() => {
    setValue('end_time', endTime)
  }, [endTime, setValue])

  //! Handle submit
  const queryClient = useQueryClient()
  const updateCourseMutation = useMutation({ mutationFn: courseApi.updateCourse })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => console.error(errors)
  const onSubmit = async (data: FormData) => {
    setExcutingDialog(true)
    setExcuting(true)

    const body = {
      ...data,
      start_time: formatTimeToSeconds(data.start_time?.getTime() as number),
      end_time: formatTimeToSeconds((data.end_time?.getTime() as number) + 86400000)
    }

    updateCourseMutation.mutate(body, {
      onSuccess: () => {
        setError(false)
        reset()
        setStartTime(currentDate)
        setEndTime(currentDate)
        queryClient.invalidateQueries({ queryKey: ['course_list'] })
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          const formError = error.response?.data
          if (formError) {
            const responeLog = formError?.log as string
            console.log(responeLog)
            setErrorMessage(HttpStatusMessage.get(formError.error_key) || 'Lỗi không xác định')
          }
        }
        setError(true)
      },
      onSettled: () => {
        setExcuting(false)
        window.scrollTo({ top: 0, left: 0 })
      }
    })
  }

  return (
    <Fragment>
      <div className='w-full space-y-8 p-4 rounded-lg border border-black/20 bg-webColor100'>
        <FormProvider {...methods}>
          <form className='' onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <AdminUpdateCourseForm course={currentCourse} />

            <div className='fixed bottom-2 left-0 z-10 w-full text-darkText bg-black/60'>
              <div className='flex w-full items-center justify-between space-x-2 rounded-lg '>
                <div className='shrink-0 rounded-lg bg-hoveringBg px-4 py-2 text-lg font-semibold'>Đang chỉnh sửa</div>
                <div className=' flex w-full justify-end space-x-8 px-4'>
                  <button
                    type='button'
                    className='rounded-md bg-alertRed/80 px-4 py-1  hover:bg-alertRed'
                    onClick={() => setEditingMode(false)}
                  >
                    Hủy chỉnh sửa
                  </button>

                  <button type='submit' className='rounded-md bg-unhoverBg px-4 py-1  hover:bg-hoveringBg'>
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      {/*//! EXCUTING FIELD */}
      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false)
        }}
      >
        <div className='w-full flex items-center justify-center'>
          {excuting && <LoadingRing />}
          {!excuting && (
            <Fragment>
              {!error && (
                <p className='text-center text-xl font-medium uppercase leading-6 text-successGreen'>
                  Cập nhật khóa học thành công
                </p>
              )}
              {error && (
                <Fragment>
                  {errorMessage == '' && (
                    <p className='text-center text-xl font-medium uppercase leading-6 text-alertRed'>
                      Đã có lỗi xảy ra, vui lòng thử lại sau
                    </p>
                  )}
                  {errorMessage != '' && (
                    <p className='text-center text-xl font-medium uppercase leading-6 text-alertRed'>{errorMessage}</p>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </DialogPopup>
    </Fragment>
  )
}
