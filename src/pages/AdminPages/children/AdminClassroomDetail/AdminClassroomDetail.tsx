import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { Fragment, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classroomApi from 'src/apis/classroom.api'
import BackButton from 'src/components/BackButton'
import DialogPopup from 'src/components/DialogPopup'
import LoadingSection from 'src/components/LoadingSection'
import { adminPath } from 'src/constants/path'
import { AdminContext } from 'src/contexts/admin.context'
import { DetailedMember } from 'src/types/member.type'
import { generateNameId, getIdFromUrl } from 'src/utils/utils'

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
  //! Declate states
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [confirmMessage, setConfirmMessage] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

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
    setDeleteDialog(true)
    setConfirmMessage(true)
    setExcuting(false)
    setError(false)
  }

  const closeDeleteDialog = () => {
    setDeleteDialog(false)
    setConfirmMessage(false)
    success && navigate(-1)
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
          setSuccess(true)
          setError(false)
          queryClient.invalidateQueries({
            queryKey: ['admin_classroom_list']
          })
        },
        onError: () => {
          setSuccess(false)
          setError(true)
        }
      }
    )
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
          <p className='flex space-x-2 font-medium desktop:text-xl text-lg justify-center'>
            <span className='font-medium opacity-60'>Giáo viên:</span>
            <span className='text-primaryText'>{teacher ? teacher.name : ''}</span>
          </p>
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

      <DialogPopup isOpen={deleteDialog} handleClose={closeDeleteDialog}>
        {confirmMessage && (
          <div className='desktop:text-lg space-y-4 text-center'>
            <p className='font-medium text-alertRed'>Những thành viên trong lớp học này sẽ bị buộc rời khỏi lớp</p>
            <p className=''>Bạn có chắc muốn xóa lớp học này chứ?</p>
            <div className='w-full justify-between flex'>
              <button
                onClick={closeDeleteDialog}
                className='px-3 text-sm py-1 rounded-md bg-unhoverBg hover:bg-hoveringBg'
              >
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
                {success && (
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
    </div>
  )
}
