import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classroomApi, { AddTeacherForm } from 'src/apis/classroom.api'
import BackButton from 'src/components/BackButton'
import DialogPopup from 'src/components/DialogPopup'
import LoadingSection from 'src/components/LoadingSection'
import { AdminContext } from 'src/contexts/admin.context'
import { generateNameId, getIdFromUrl } from 'src/utils/utils'
import AdminTeacherSelector from '../../components/AdminTeacherSelector'
import { getCourseFromLS } from 'src/utils/auth'
import AdminStudentCard from '../../components/AdminStudentCard'
import AdminScoreStatistic from '../../components/AdminScoreStatistic'
import { User } from 'src/types/user.type'
import { adminPath } from 'src/constants/path'

export default function AdminClassroomDetail() {
  const { currentTeacherId, setCurrentUser } = useContext(AdminContext)
  const course = getCourseFromLS()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  //! Declate states
  const [statistic, setStatistic] = useState<boolean>(false)

  const [dialog, setDialog] = useState<boolean>(false)
  const [confirmMessage, setConfirmMessage] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false)

  const [addteacher, setAddteacher] = useState<boolean>(false)
  const [addteacherSuccess, setAddteacherSuccess] = useState<boolean>(false)
  const [noTeacher, setNoTeacher] = useState<boolean>(false)

  //! Get classroom detail
  const pathname = useLocation().pathname
  const classroomId = getIdFromUrl(pathname)

  const { data: memberListData } = useQuery({
    queryKey: ['admin_member_list', classroomId],
    queryFn: () => classroomApi.getMemberListInClassromm({ classroom_id: classroomId })
  })
  const memberList = memberListData?.data.data
  const teacher = memberList?.find((member) => member.role == 1)
  const studentList = memberList?.filter((member) => member.role == 0) || []

  //! Handle delete classroom
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

  const deleteClassroomMutation = useMutation({
    mutationFn: classroomApi.deleteClassroom
  })
  const handleDelete = () => {
    setConfirmMessage(false)
    setExcuting(true)
    deleteClassroomMutation.mutate(
      { classroom_ids: [classroomId] },
      {
        onSettled: () => {
          setExcuting(false)
        },
        onSuccess: () => {
          setDeleteSuccess(true)
          setError(false)
          queryClient.invalidateQueries({
            queryKey: ['admin_classroom_list']
          })
        },
        onError: () => {
          setDeleteSuccess(false)
          setError(true)
        }
      }
    )
  }

  //! Handle add teacher
  const addTeacherMutation = useMutation({
    mutationFn: classroomApi.addTeacherToClassroom
  })
  const addTeacher = () => {
    setDialog(true)
    setConfirmMessage(false)
    setExcuting(true)

    const body: AddTeacherForm = {
      classroom_id: classroomId,
      user_id: currentTeacherId as string,
      role: 1
    }
    addTeacherMutation.mutate(body, {
      onSettled: () => {
        setExcuting(false)
      },
      onSuccess: () => {
        setAddteacherSuccess(true)
        setNoTeacher(false)
        setError(false)
        queryClient.invalidateQueries({ queryKey: ['admin_member_list'] })
      },
      onError: () => {
        setAddteacherSuccess(false)
        setError(true)
      }
    })
  }

  const handleAddTeacher = () => {
    if (!currentTeacherId) {
      setNoTeacher(true)
      return
    }
    addTeacher()
  }

  //! Handle click
  const handleClick = (user: User) => () => {
    setCurrentUser(user)
    navigate({ pathname: `${adminPath.users}/${generateNameId({ name: user.name, id: user._id })}` })
  }

  return (
    <div className='space-y-8'>
      <div className='flex justify-between'>
        <BackButton />
        <button onClick={openDeleteDialog} className='py-1.5 px-4 bg-alertRed/80 hover:bg-alertRed rounded-md'>
          Xóa lớp học
        </button>
      </div>

      {!memberList && <LoadingSection />}

      <div className='w-full flex justify-center'>
        <button
          onClick={() => setStatistic(!statistic)}
          className='px-2 text-darkText py-2 rounded-xl bg-unhoverBg hover:bg-hoveringBg hover:border-primaryText'
        >
          {statistic ? 'Danh sách thành viên' : 'Thống kê điểm'}
        </button>
      </div>

      {!statistic && (
        <Fragment>
          {memberList && (
            <div className='space-y-6'>
              <p className='font-bold text-xl text-center desktop:text-3xl tracking-widest text-primaryText uppercase'>
                Thành viên
              </p>

              <div className='flex space-x-2 font-medium desktop:text-xl text-lg justify-center'>
                <span className='font-medium opacity-60'>Giáo viên:</span>
                {teacher ? (
                  <button onClick={handleClick(teacher)} className='text-primaryTextUnHover hover:text-primaryText'>{teacher.name}</button>
                ) : (
                  <div className='flex space-x-4'>
                    <span className='text-alertRed'>Chưa có giáo viên</span>
                    <button
                      onClick={() => setAddteacher(true)}
                      className='rounded-md py-1 px-3 text-sm font-normal bg-unhoverBg hover:bg-hoveringBg'
                    >
                      Chỉ định giáo viên
                    </button>
                  </div>
                )}
              </div>

              {addteacher && (
                <div className='flex p-4 rounded-md border border-white bg-webColor100 flex-col items-center space-y-4'>
                  <button
                    onClick={() => setAddteacher(false)}
                    className='rounded-md py-1 px-3 text-sm font-normal bg-alertRed/80 hover:bg-alertRed'
                  >
                    Hủy
                  </button>
                  <AdminTeacherSelector />

                  {noTeacher && <p className='text-alertRed font-medium text-lg uppercase'>Chưa chọn giáo viên!</p>}

                  <div className='w-full flex justify-end'>
                    <button
                      onClick={handleAddTeacher}
                      className='rounded-md py-1 px-3 text-sm font-normal bg-unhoverBg hover:bg-hoveringBg'
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              )}

              <div className='rounded-lg border-black/20 p-4 bg-webColor100 space-y-4'>
                <p className='font-medium text-center text-lg desktop:text-xl uppercase'>Danh sách sinh viên</p>
                <div className='flex flex-col space-y-2'>
                  {studentList.map((student, index) => (
                    <AdminStudentCard key={index} student={student} index={index} course={course} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}

      {statistic && <AdminScoreStatistic studentList={studentList} course={course} />}

      <DialogPopup isOpen={dialog} handleClose={closeDialog}>
        {confirmMessage && (
          <div className='desktop:text-lg space-y-4 text-center'>
            <p className='font-medium text-alertRed'>Những thành viên trong lớp học này sẽ bị buộc rời khỏi lớp</p>
            <p className=''>Bạn có chắc muốn xóa lớp học này chứ?</p>
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
                {addteacherSuccess && (
                  <p className='text-center text-xl font-medium uppercase leading-6 text-successGreen'>
                    Đã chỉ định giáo viên cho lớp học
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
    </div>
  )
}
