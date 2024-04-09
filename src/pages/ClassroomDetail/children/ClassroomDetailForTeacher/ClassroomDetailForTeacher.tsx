import { Fragment, useContext, useState } from 'react'
import { ClassroomContext } from 'src/contexts/classroom.context'
import ClassroomTeacherCreateLesson from '../../components/ClassroomTeacherCreateLesson'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import lessonApi from 'src/apis/lesson.api'
import { Lesson } from 'src/types/lesson.type'
import ClassroomLessonCard from '../../components/ClassroomLessonCard'
import DialogPopup from 'src/components/DialogPopup'
import LoadingSection from 'src/components/LoadingSection'

interface ExtendedLesson extends Lesson {
  isOpen: boolean
}

export default function ClassroomDetailForTeacher() {
  const { currentClassroom } = useContext(ClassroomContext)
  const queryClient = useQueryClient()

  //! Declare states
  const [creatingLesson, setCreatingLesson] = useState<boolean>(false)
  const [dialog, setDialog] = useState<boolean>(false)
  const [confirmMessage, setConfirmMessage] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false)
  const [lessonId, setLessonId] = useState<string>('')

  //! Get lesson list
  const { data: lessonListData } = useQuery({
    queryKey: ['lesson_list'],
    queryFn: () => lessonApi.listLessons({ classroom_id: currentClassroom?.class._id as string }),
    enabled: Boolean(currentClassroom)
  })
  const lessonList = lessonListData?.data.data || []
  const extendedLessonList: ExtendedLesson[] = lessonList.map((lesson) => {
    return { ...lesson, isOpen: false }
  })

  //! Delete lesson
  const openDeleteDialog = (id: string) => () => {
    setDialog(true)
    setConfirmMessage(true)
    setExcuting(false)
    setError(false)
    setLessonId(id)
  }

  const closeDialog = () => {
    setDialog(false)
    setConfirmMessage(false)
  }

  const deleteLessonMutation = useMutation({
    mutationFn: lessonApi.deleteLesson
  })
  //! Handle delete
  const handleDelete = () => {
    setConfirmMessage(false)
    setExcuting(true)

    if (lessonId == '') {
      setExcuting(false)
      setError(true)
      return
    }

    deleteLessonMutation.mutate(
      {
        lesson_id: lessonId,
        classroom_id: currentClassroom?.class._id as string
      },
      {
        onSettled: () => {
          setExcuting(false)
        },
        onSuccess: () => {
          setDeleteSuccess(true)
          setError(false)
          queryClient.invalidateQueries({
            queryKey: ['lesson_list']
          })
        },
        onError: () => {
          setDeleteSuccess(false)
          setError(true)
        }
      }
    )
  }

  return (
    <Fragment>
      {!currentClassroom && (
        <div className='text-alertRed text-lg font-medium uppercase'>Không thể lấy thông tin lớp học</div>
      )}

      {currentClassroom && (
        <div className='space-y-8'>
          {!creatingLesson && (
            <div className='w-full justify-center py-4 flex'>
              <button
                onClick={() => setCreatingLesson(true)}
                className='py-2 px-4 bg-unhoverBg hover:bg-hoveringBg rounded-md'
              >
                Thêm bài giảng
              </button>
            </div>
          )}

          {creatingLesson && <ClassroomTeacherCreateLesson setCreatingLesson={setCreatingLesson} />}

          {extendedLessonList.length > 0 && (
            <div className='space-y-6'>
              <p className='uppercase text-lg text-center desktop:text-xl font-medium tracking-wide'>Bài giảng</p>

              {extendedLessonList.map((lesson) => (
                <div key={lesson._id} className='space-y-1'>
                  <ClassroomLessonCard lesson={lesson} />
                  <div className='w-full flex justify-end'>
                    <button
                      onClick={openDeleteDialog(lesson._id)}
                      className='rounded-md py-1 px-3 hover:bg-alertRed bg-alertRed/70'
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <DialogPopup isOpen={dialog} handleClose={closeDialog}>
        {confirmMessage && (
          <div className='desktop:text-lg space-y-4 text-center'>
            <p className=''>Bạn có chắc muốn xóa bài giảng này chứ?</p>
            <div className='w-full justify-between flex'>
              <button onClick={closeDialog} className='px-3 text-sm py-1 rounded-md bg-unhoverBg hover:bg-hoveringBg'>
                Hủy
              </button>
              <button onClick={handleDelete} className='px-3 text-sm py-1 rounded-md bg-alertRed/80 hover:bg-alertRed'>
                Xóa
              </button>
            </div>
          </div>
        )}

        {!confirmMessage && (
          <Fragment>
            {excuting && <LoadingSection />}
            {!excuting && (
              <Fragment>
                {deleteSuccess && (
                  <p className='text-center text-xl font-medium uppercase leading-6 text-successGreen'>
                    Đã xóa bài giảng
                  </p>
                )}

                {error && (
                  <p className='text-center text-xl font-medium uppercase leading-6 text-alertRed'>
                    Đã có lỗi xảy ra, vui lòng thử lại
                  </p>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </DialogPopup>
    </Fragment>
  )
}
