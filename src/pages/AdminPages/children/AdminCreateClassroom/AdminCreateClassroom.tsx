import { Fragment, useContext, useEffect, useState } from 'react'
import AdminCourseSelector from '../../components/AdminCourseSelector'
import { AdminContext } from 'src/contexts/admin.context'
import { AdminCreateClassroomSchema, adminCreateClassroomSchema } from 'src/rules/classroom.rule'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import AdminCreateClassroomForm from '../../components/AdminCreateClassroomForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import classroomApi, { CreateClassroomForm } from 'src/apis/classroom.api'
import { formatTimeToSeconds, isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import { reject } from 'lodash'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'

type FormData = AdminCreateClassroomSchema

const currentDate = new Date()

export default function AdminCreateClassroom() {
  const { currentCourse, canCreateClassroom } = useContext(AdminContext)

  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  //! Use form
  const methods = useForm<FormData>({
    defaultValues: {
      course_id: currentCourse?._id,
      limit: 1,
      weeks: 12,
      lesson_start: 7,
      lesson_end: 9,
      date: currentDate
    },
    resolver: yupResolver(adminCreateClassroomSchema)
  })
  const { handleSubmit, setValue, reset } = methods

  useEffect(() => {
    setValue('course_id', currentCourse?._id || '')
  }, [currentCourse, setValue])
  // useEffect(() => {
  //   setValue('lesson_end', lessonEnd)
  // }, [lessonEnd, setValue])

  //! Create classroom
  const queryClient = useQueryClient()
  const createClassroomMutation = useMutation({
    mutationFn: classroomApi.createClassroom
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
      const date = data.date
      const createBody: CreateClassroomForm = {
        course_id: data.course_id,
        weeks: data.weeks,
        limit: data.limit,
        time_table: [
          {
            lesson_start: formatTimeToSeconds(
              new Date(date.getFullYear(), date.getMonth(), date.getDate(), data.lesson_start).getTime()
            ),
            lesson_end: formatTimeToSeconds(
              new Date(date.getFullYear(), date.getMonth(), date.getDate(), data.lesson_end).getTime()
            )
          }
        ]
      }

      createClassroomMutation.mutate(createBody, {
        onSuccess: () => {
          setError(false)
          reset()
          queryClient.invalidateQueries({ queryKey: ['admin_classroom_list'] })
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
    <div className='space-y-8'>
      <AdminCourseSelector />

      <div className='w-full rounded-lg p-4 bg-webColor100'>
        {!currentCourse && (
          <div className='w-full text-center py-8 text-2xl tracking-wide font-semibold uppercase text-webColor800'>
            Chọn 1 khóa học
          </div>
        )}

        {!canCreateClassroom && (
          <p className='text-alertRed uppercase font-semibold desktop:text-xl text-center tracking-wide py-10'>
            Số lớp học đã đạt tối đa
          </p>
        )}

        {currentCourse && canCreateClassroom && (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className='space-y-4'>
              <AdminCreateClassroomForm />

              <div className='w-full flex justify-end'>
                <button type='submit' className='py-1.5 px-4 rounded-md bg-unhoverBg hover:bg-hoveringBg'>
                  Thêm lớp học
                </button>
              </div>
            </form>
          </FormProvider>
        )}
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
                  Thêm lớp học thành công
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
