import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { reject } from 'lodash'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import classroomApi from 'src/apis/classroom.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { UpdateScoreSchema, updateScoreSchema } from 'src/rules/score.rule'
import { JoinedClassroom } from 'src/types/joinedClassroom.type'
import { DetailedMember } from 'src/types/member.type'
import { ErrorRespone, InputField } from 'src/types/utils.type'
import { isAxiosBadRequestError } from 'src/utils/utils'

interface Props {
  classroom: JoinedClassroom
  student: DetailedMember
}

type FormData = UpdateScoreSchema

export default function ClassroomStudentCard({ student, classroom }: Props) {
  const { updatingStudentID, setUpdatingStudentID } = useContext(ClassroomContext)

  //! Declare states
  const [updatingScore, setUpdatingScore] = useState<boolean>(false)
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const resetState = () => {
    setExcuting(false)
    setError(false)
    setErrorMessage('')
  }

  useEffect(() => {
    if (updatingStudentID != student._id) {
      cancelUpdating()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student._id, updatingStudentID])

  //! Calculate score
  const course = classroom.course
  const averageScore =
    (student.attendance * course.attendance_ratio +
      student.lab * course.lab_ratio +
      student.midterm * course.midterm_ratio +
      student.final * course.final_ratio) /
    1000

  //! Use form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      classroom_id: classroom.class._id,
      user_id: student._id,
      attendance: student.attendance * 10,
      lab: student.lab * 10,
      midterm: student.midterm * 10,
      final: student.final * 10
    },
    resolver: yupResolver(updateScoreSchema)
  })

  //! Form fields
  const fields: InputField[] = [
    {
      error: errors.attendance,
      errorMessage: errors.attendance?.message,
      name: 'attendance',
      title: 'Tên bài giảng'
    },
    {
      error: errors.lab,
      errorMessage: errors.lab?.message,
      name: 'lab',
      title: 'Tên bài giảng'
    },
    {
      error: errors.midterm,
      errorMessage: errors.midterm?.message,
      name: 'midterm',
      title: 'Tên bài giảng'
    },
    {
      error: errors.final,
      errorMessage: errors.final?.message,
      name: 'final',
      title: 'Tên bài giảng'
    }
  ]

  //! Handle update
  const queryClient = useQueryClient()
  const updateScoreMutation = useMutation({
    mutationFn: classroomApi.updateScoreForStudent
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => {
    setExcutingDialog(true)
    setError(true)
    setErrorMessage('Điểm không hợp lệ')
    console.log(errors)
    reject(errors)
  }
  const onSubmit = async (data: FormData) => {
    resetState()
    setExcutingDialog(true)
    setExcuting(true)

    try {
      updateScoreMutation.mutate(data, {
        onSuccess: () => {
          setError(false)
          setUpdatingScore(false)
          reset()
          queryClient.invalidateQueries({ queryKey: ['member_list'] })
        },
        onError: (error) => {
          console.log(error)
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

  const cancelUpdating = () => {
    setValue('attendance', student.attendance)
    setValue('lab', student.lab)
    setValue('midterm', student.midterm)
    setValue('final', student.final)
    setUpdatingScore(false)
  }

  //! Style
  const cellStyle =
    'border-b border-x border-black/20 py-2 flex justify-center items-center font-semibold desktop:text-lg'

  return (
    <Fragment>
      {!updatingScore && (
        <div className='grid w-full grid-cols-10'>
          <p className={classNames(cellStyle, 'col-span-3')}>{student.name}</p>
          <p className={classNames(cellStyle, 'col-span-1')}>{student.attendance / 10}</p>
          <p className={classNames(cellStyle, 'col-span-1')}>{student.lab / 10}</p>
          <p className={classNames(cellStyle, 'col-span-1')}>{student.midterm / 10}</p>
          <p className={classNames(cellStyle, 'col-span-1')}>{student.final / 10}</p>
          <p className={classNames(cellStyle, 'col-span-1 text-primaryText')}>{averageScore}</p>
          <div className={classNames(cellStyle, 'col-span-2')}>
            <button
              onClick={() => {
                setUpdatingScore(true)
                setUpdatingStudentID(student._id)
              }}
              className='hover:text-primaryText'
            >
              Cập nhật
            </button>
          </div>
        </div>
      )}

      {updatingScore && (
        <form className='grid w-full grid-cols-10'>
          <p className={classNames(cellStyle, 'col-span-3')}>{student.name}</p>
          {fields.map((field, index) => {
            const registerResult = register(
              field.name as 'classroom_id' | 'user_id' | 'attendance' | 'lab' | 'midterm' | 'final'
            )
            return (
              <div
                key={index}
                className={classNames(cellStyle, 'overflow-hidden flex items-center justify-center px-1')}
              >
                <input
                  className='grow-0 outline-1 rounded-md outline focus:outline-2 outline-black/40 focus:outline-primaryText w-full text-center'
                  {...registerResult}
                ></input>
              </div>
            )
          })}

          <p className={classNames(cellStyle, 'col-span-1 text-primaryText')}>{averageScore}</p>

          <div className={classNames(cellStyle, 'col-span-2 w-full flex items-center justify-between px-6')}>
            <button
              type='button'
              onClick={cancelUpdating}
              className='hover:bg-alertRed rounded-md py-0.5 px-3 bg-alertRed/80 font-normal'
            >
              Hủy
            </button>
            <button
              type='submit'
              onClick={handleSubmit(onSubmit, onInvalid)}
              className='hover:bg-hoveringBg rounded-md py-0.5 px-3 bg-unhoverBg font-normal'
            >
              Lưu
            </button>
          </div>
        </form>
      )}

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
                  Cập nhật thành công
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
