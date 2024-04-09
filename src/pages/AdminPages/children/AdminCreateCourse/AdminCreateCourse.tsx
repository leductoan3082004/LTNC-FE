import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reject } from 'lodash'
import { Fragment, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import courseApi from 'src/apis/course.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'
import { AdminCreateCourseSchema, adminCreateCourseSchema } from 'src/rules/course.rule'
import { ErrorRespone } from 'src/types/utils.type'
import { formatTimeToSeconds, isAxiosBadRequestError } from 'src/utils/utils'
import AdminCreateCourseForm from '../../components/AdminCreateCourseForm'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'

type FormData = AdminCreateCourseSchema

const currentDate = new Date()

export default function AdminCreateCourse() {
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  //! USE FORM
  const [startTime, setStartTime] = useState<Date>(currentDate)
  const [endTime, setEndTime] = useState<Date>(currentDate)
  const methods = useForm<FormData>({
    defaultValues: {
      course_name: '',
      description: '',
      credit: 1,
      limit: 1,
      attendance_ratio: 0,
      lab_ratio: 20,
      midterm_ratio: 30,
      final_ratio: 50,
      start_time: currentDate,
      end_time: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())
    },
    resolver: yupResolver(adminCreateCourseSchema)
  })
  const { handleSubmit, setValue, reset } = methods

  useEffect(() => {
    setValue('start_time', startTime)
  }, [startTime, setValue])
  useEffect(() => {
    setValue('end_time', endTime)
  }, [endTime, setValue])

  //! Create course
  const queryClient = useQueryClient()
  const createUserMutation = useMutation({
    mutationFn: courseApi.createCourse
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => {
    console.log(errors)
    reject(errors)
  }
  const onSubmit = async (data: FormData) => {
    setExcutingDialog(true)
    setExcuting(true)

    try {
      const createBody = {
        ...data,
        start_time: formatTimeToSeconds(data.start_time?.getTime() as number),
        end_time: formatTimeToSeconds(data.end_time?.getTime() as number)
      }

      createUserMutation.mutate(createBody, {
        onSuccess: () => {
          setError(false)
          reset()
          setStartTime(currentDate)
          setEndTime(currentDate)
          queryClient.invalidateQueries({ queryKey: ['admin_course_list'] })
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
    } catch (error) {
      setExcuting(false)
      setError(true)
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          const responeLog = formError?.log as string
          console.log(responeLog)
        }
      }
    }
  }

  return (
    <div className='rounded-lg bg-webColor200 p-4'>
      <p className='text-xl uppercase font-bold text-primaryText w-full text-center'>Tạo khóa học</p>
      <div className='py-4 px-20 w-full'>
        <div className='border-t border-white'></div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className='space-y-4 mt-4'>
          <AdminCreateCourseForm />
          <div className='w-full flex justify-end'>
            <button
              className='rounded-lg bg-unhoverBg px-4 py-1 text-base hover:bg-hoveringBg lg:text-lg'
              type='submit'
            >
              Tạo khóa học mới
            </button>
          </div>
        </form>
      </FormProvider>

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
                  Tạo khóa học thành công
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
    </div>
  )
}
