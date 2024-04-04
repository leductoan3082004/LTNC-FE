import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import memberApi from 'src/apis/member.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'
import DaysInWeekEnum from 'src/constants/daysInWeek'
import { Classroom } from 'src/types/classroom.type'

interface Props {
  classroom: Classroom
  canRegister?: boolean
  joinedClassroomList?: string[]
}

export default function CourseDetailClassroomCard({ classroom, canRegister = false, joinedClassroomList = [] }: Props) {
  //! Declare states
  const [excuting, setExcuting] = useState<boolean>(false)
  const [dialog, setDialog] = useState<boolean>(false)
  const [registerError, setRegisterError] = useState<boolean>(false)

  //! Get timetable
  const startTimestamp = new Date(classroom.time_table[0].lesson_start)
  const endTimestamp = new Date(classroom.time_table[0].lesson_end)

  const startTime = startTimestamp.getHours().toString() + ':' + startTimestamp.getMinutes().toString()
  const endTime = endTimestamp.getHours().toString() + ':' + endTimestamp.getMinutes().toString()
  const day = startTimestamp.getDay()

  //! Handle registration
  const queryClient = useQueryClient()
  const registerMutation = useMutation({ mutationFn: memberApi.registerToClassroom })
  const handleClick = () => {
    setDialog(true)
    setExcuting(true)
    registerMutation.mutate(classroom._id, {
      onSettled: () => {
        setExcuting(false)
        queryClient.invalidateQueries({ queryKey: ['classroom_list_in_course'] })
        queryClient.invalidateQueries({ queryKey: ['joined_classroom_list'] })
      },
      onSuccess: () => {
        setRegisterError(false)
      },
      onError: () => {
        setRegisterError(true)
      }
    })
  }

  //! Check if a classroom is registerd
  // console.log(joinedClassroomList)
  const isRegistered = joinedClassroomList.includes(classroom._id)

  return (
    <div className='bg-webColor100 rounded-md p-2 space-y-2'>
      <p className='uppercase font-medium text-lg text-center desktop:text-xl space-x-1.5'>
        <span className=''>Lớp</span>
        <span className=''>
          <span className=''>L</span>
          <span className=''>{1}</span>
        </span>
      </p>
      <div className='flex space-x-1'>
        <span className='text-primaryText font-medium'>{startTime}</span>
        <span className=''>đến</span>
        <span className='text-primaryText font-medium'>{endTime}</span>
      </div>
      <div className='flex space-x-1'>
        <span className='text-primaryText font-medium'>{DaysInWeekEnum[day]}</span>
        <span className=''>các tuần</span>
      </div>

      <div className='flex space-x-2 items-center'>
        <span className='opacity-60'>Thành viên: </span>
        <span className='text-primaryText font-medium flex space-x-0.5 items-center'>
          <span>{classroom.members ? classroom.members.length : 0}</span>
          <span className='text-xl'>/</span>
          <span>{classroom.limit}</span>
        </span>
      </div>

      {canRegister && (
        <div className='w-full justify-center flex min-h-8'>
          <button
            disabled={isRegistered}
            onClick={handleClick}
            className='flex bg-unhoverBg disabled:hover:bg-unhoverBg disabled:opacity-40 hover:bg-hoveringBg rounded-lg items-center justify-center py-2 px-4'
          >
            {isRegistered ? 'Đã đăng ký' : 'Đăng ký'}
          </button>
        </div>
      )}

      {/*//! EXCUTING FIELD */}
      <DialogPopup
        isOpen={dialog}
        handleClose={() => {
          setDialog(false)
        }}
      >
        <div className='w-full min-h-20 flex items-center justify-center'>
          {excuting && <LoadingRing />}
          {!excuting && (
            <Fragment>
              {!registerError && (
                <p className='text-center text-xl shrink-0 font-medium uppercase leading-6 text-successGreen'>
                  Đăng ký lớp học thành công
                </p>
              )}
              {registerError && (
                <Fragment>
                  <p className='text-center shrink-0 text-xl font-medium uppercase leading-6 text-alertRed'>
                    Đã có lỗi xảy ra, vui lòng thử lại sau
                  </p>
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </DialogPopup>
    </div>
  )
}
