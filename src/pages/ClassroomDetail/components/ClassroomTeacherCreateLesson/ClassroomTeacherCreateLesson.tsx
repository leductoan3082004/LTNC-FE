import { yupResolver } from '@hookform/resolvers/yup'
import React, { Fragment, useContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { CreateLessonSchema, createLessonSchema } from 'src/rules/classroom.rule'
import ClassroomTeacherCreateLessonForm from '../ClassroomTeacherCreateLessonForm'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import classroomApi from 'src/apis/classroom.api'
import lessonApi from 'src/apis/lesson.api'
import { reject } from 'lodash'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'

interface Props {
  setCreatingLesson: React.Dispatch<React.SetStateAction<boolean>>
}

type FormData = CreateLessonSchema

export default function ClassroomTeacherCreateLesson({ setCreatingLesson }: Props) {
  const { currentClassroom } = useContext(ClassroomContext)

  //! Declare states
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  //! Use form
  const methods = useForm<FormData>({
    defaultValues: {
      classroom_id: currentClassroom?.class._id || '',
      name: '',
      content: ''
    },
    resolver: yupResolver(createLessonSchema)
  })
  const { handleSubmit, setValue, reset } = methods

  const handleClose = () => {
    reset()
    setCreatingLesson(false)
  }

  //! Create course
  const queryClient = useQueryClient()
  const createUserMutation = useMutation({
    mutationFn: lessonApi.createLesson
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
      createUserMutation.mutate(data, {
        onSuccess: () => {
          setError(false)
          reset()
          queryClient.invalidateQueries({ queryKey: ['lesson_list'] })
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
      console.log(error)
    }
  }

  return (
    <div className='round-lg bg-webColor100 p-4 space-y-4'>
      <p className='text-center uppercase tetx-lg desktop:text-xl tracking-wide font-medium'>Thêm bài giảng</p>
      <FormProvider {...methods}>
        <form className='space-y-4'>
          <ClassroomTeacherCreateLessonForm />
        </form>
        <div className='w-full space-x-8 flex justify-end'>
          <button onClick={handleClose} type='button' className='rounded-md py-1 px-4 bg-alertRed/70 hover:bg-alertRed'>
            Hủy
          </button>
          <button
            type='submit'
            onClick={handleSubmit(onSubmit, onInvalid)}
            className='rounded-md py-1 px-4 bg-unhoverBg hover:bg-hoveringBg'
          >
            Thêm bài giảng
          </button>
        </div>
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
