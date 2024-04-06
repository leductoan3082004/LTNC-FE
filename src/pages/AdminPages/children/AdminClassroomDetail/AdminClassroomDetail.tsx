import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { Fragment, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classroomApi, { AddTeacherForm } from 'src/apis/classroom.api'
import BackButton from 'src/components/BackButton'
import DialogPopup from 'src/components/DialogPopup'
import LoadingSection from 'src/components/LoadingSection'
import { adminPath } from 'src/constants/path'
import { AdminContext } from 'src/contexts/admin.context'
import { DetailedMember } from 'src/types/member.type'
import { generateNameId, getIdFromUrl } from 'src/utils/utils'
import AdminTeacherSelector from '../../components/AdminTeacherSelector'

function StudentCard({ student, index }: { student: DetailedMember; index: number }) {
  const averageScore = student.attendance + student.lab + student.midterm + student.final
  const weak = averageScore < 4.0
  const normal = averageScore >= 4.0 && averageScore < 6.0
  const fine = averageScore >= 6.0 && averageScore < 8.0
  const good = averageScore >= 8.0

  //! Handle click
  const { setCurrentStudent } = useContext(AdminContext)
  const navigate = useNavigate()
  const handleClick = () => {
    setCurrentStudent(student)
    navigate({ pathname: `${adminPath.studentList}/${generateNameId({ name: student.name, id: student._id })}` })
  }

  return (
    <button
      onClick={handleClick}
      className='flex py-3 px-4 border-b space-x-2 border-black/20 items-center shadow-sm rounded-md bg-webColor100 hover:bg-webColor300'
    >
      <span className='opacity-60 desktop:text-lg'>{index + 1}.</span>
      <div className='flex items-center grow justify-between'>
        <span className='font-medium desktop:text-lg'>{student.name}</span>
        <div className='flex space-x-1'>
          <span className='opacity-60'>Điểm tổng kết:</span>
          <span
            className={classNames('font-medium', {
              'text-weakColor': weak,
              'text-normalColor': normal,
              'text-fineColor': fine,
              'text-goodColor': good
            })}
          >
            {averageScore}
          </span>
        </div>
      </div>
    </button>
  )
}

export default function AdminClassroomDetail() {
  const { currentTeacherId } = useContext(AdminContext)

  //! Declate states
  const [dialog, setDialog] = useState<boolean>(false)
  const [confirmMessage, setConfirmMessage] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false)

  const [addteacher, setAddteacher] = useState<boolean>(false)
  const [addteacherSuccess, setAddteacherSuccess] = useState<boolean>(false)
  const [noTeacher, setNoTeacher] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  //! Get classroom detail
  const pathname = useLocation().pathname
  const classroomId = getIdFromUrl(pathname)

  const { data: memberListData } = useQuery({
    queryKey: ['admin_member_list', classroomId],
    queryFn: () => classroomApi.getMemberListInClassromm({ classroom_id: classroomId }),
    enabled: Boolean(classroomId),
    staleTime: 1000 * 60 * 3
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

  return (
    <div className='space-y-8'>
      <div className='flex justify-between'>
        <BackButton />
        <button onClick={openDeleteDialog} className='py-1.5 px-4 bg-alertRed/80 hover:bg-alertRed rounded-md'>
          Xóa lớp học
        </button>
      </div>

      {!memberList && <LoadingSection />}

      {memberList && (
        <div className='space-y-6'>
          <p className='font-bold text-xl text-center desktop:text-3xl tracking-widest text-primaryText uppercase'>
            Thành viên
          </p>
          <div className='flex space-x-2 font-medium desktop:text-xl text-lg justify-center'>
            <span className='font-medium opacity-60'>Giáo viên:</span>
            {teacher ? (
              <span className='text-primaryText'>{teacher.name}</span>
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
                <StudentCard key={index} student={student} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}

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
