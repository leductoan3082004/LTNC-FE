import { Fragment, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import courseApi from 'src/apis/course.api'
import { getIdFromUrl } from 'src/utils/utils'
import LoadingRing from 'src/components/LoadingRing'
import AdminCourseInfo from '../../components/AdminCourseInfo'
import AdminUpdateCourse from '../../components/AdminUpdateCourse'
import AdminClassroomList from '../../components/AdminClassroomList'
import DialogPopup from 'src/components/DialogPopup'
import LoadingSection from 'src/components/LoadingSection'

export default function AdminCourseDetail() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  //! Declare stats
  const [editingMode, setEditingMode] = useState<boolean>(false)
  const [dialog, setDialog] = useState<boolean>(false)
  const [confirmMessage, setConfirmMessage] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false)

  //! Get course detail
  const pathname = useLocation().pathname
  const courseId = getIdFromUrl(pathname)
  const { data: courseData } = useQuery({
    queryKey: ['admin_course_detail', courseId],
    queryFn: () => courseApi.getCourseById(courseId)
  })
  const course = courseData?.data.data

  //! Delete course
  const openDeleteDialog = () => {
    setDialog(true)
    setConfirmMessage(true)
    setExcuting(false)
    setError(false)
  }

  const closeDialog = () => {
    setDialog(false)
    setConfirmMessage(false)
    deleteSuccess && navigate(-1)
  }

  const deleteCourseMutation = useMutation({
    mutationFn: courseApi.deleteCourse
  })
  const handleDelete = () => {
    setConfirmMessage(false)
    setExcuting(true)
    deleteCourseMutation.mutate(courseId, {
      onSettled: () => {
        setExcuting(false)
      },
      onSuccess: () => {
        setDeleteSuccess(true)
        setError(false)
        queryClient.invalidateQueries({
          queryKey: ['admin_course_list']
        })
      },
      onError: () => {
        setDeleteSuccess(false)
        setError(true)
      }
    })
  }

  return (
    <Fragment>
      {!course && (
        <div className='h-[50vh] w-full flex flex-col items-center justify-center'>
          <LoadingRing />
          <div className='font-medium opacity-80 uppercase text-xl'>Đang lấy thông tin khóa học</div>
        </div>
      )}
      {course && (
        <div className='w-full space-y-4'>
          {!editingMode && <AdminCourseInfo course={course} />}

          {editingMode && <AdminUpdateCourse currentCourse={course} setEditingMode={setEditingMode} />}

          <div className='w-full flex justify-end space-x-10'>
            <button onClick={openDeleteDialog} className='rounded-md py-1 px-3 bg-alertRed/80 hover:bg-alertRed'>
              Xóa khóa học
            </button>

            {!editingMode && (
              <button
                className='rounded-md bg-unhoverBg px-6 py-1s hover:bg-hoveringBg'
                onClick={() => setEditingMode(true)}
              >
                Chỉnh sửa
              </button>
            )}
          </div>
          <div className='py-4'>
            <AdminClassroomList course={course} />
          </div>
        </div>
      )}

      <DialogPopup isOpen={dialog} handleClose={closeDialog}>
        {confirmMessage && (
          <div className='desktop:text-lg space-y-4 text-center'>
            <p className='font-medium text-alertRed'>Xóa khóa học sẽ đồng thời xóa những lớp học thuộc về khóa học</p>
            <p className=''>Bạn có chắc muốn xóa khóa học này chứ?</p>
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
                    Đã xóa lớp học
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
