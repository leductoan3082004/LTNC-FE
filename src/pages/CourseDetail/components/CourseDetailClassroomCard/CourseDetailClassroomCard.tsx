import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import memberApi from 'src/apis/member.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'
import DaysInWeekEnum from 'src/constants/daysInWeek'
import { Classroom } from 'src/types/classroom.type'
import { generateClassroomName } from 'src/utils/classroom.utils'
import { ClassroomTimetable } from '../../children/CourseDetailClassroomList/CourseDetailClassroomList'

interface Props {
  classroom: Classroom
  courseIsRegisterd: boolean
  studentTimeTable: ClassroomTimetable[]
  canRegister?: boolean
  joinedClassroomList?: string[]
}

export default function CourseDetailClassroomCard({
  classroom,
  canRegister = false,
  studentTimeTable,
  joinedClassroomList = [],
  courseIsRegisterd
}: Props) {
  //! Declare states
  const [excuting, setExcuting] = useState<boolean>(false)
  const [dialog, setDialog] = useState<boolean>(false)
  const [invalidTime, setInvalidTime] = useState<boolean>(false)
  const [registerError, setRegisterError] = useState<boolean>(false)
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)
  const [unRegisterSuccess, setUnRegisterSuccess] = useState<boolean>(false)
  const [duplicatedCourseTime, setDuplicatedCourseTime] = useState<string>('')

  //! Get timetable
  const startTimestamp = new Date(classroom.time_table[0].lesson_start)
  const endTimestamp = new Date(classroom.time_table[0].lesson_end)

  const startTime = startTimestamp.getHours()
  const endTime = endTimestamp.getHours()
  const day = startTimestamp.getDay()

  //! Handle registration
  const queryClient = useQueryClient()
  const registerMutation = useMutation({ mutationFn: memberApi.registerToClassroom })

  //:: function to check valid timetable
  const validTimetable = () => {
    for (const timetable of studentTimeTable) {
      if (timetable.day == day) {
        if (
          (timetable.startTime <= startTime && startTime <= timetable.endTime) ||
          (timetable.startTime <= endTime && endTime <= timetable.endTime)
        ) {
          setDuplicatedCourseTime(timetable.course)
          return false
        }
      }
      return true
    }
  }

  //:: register classroom
  const registerClassroom = () => {
    setDialog(true)
    setExcuting(true)
    if (!validTimetable()) {
      setExcuting(false)
      setInvalidTime(true)
      return
    }
    registerMutation.mutate(classroom._id, {
      onSettled: () => {
        setExcuting(false)
        queryClient.invalidateQueries({ queryKey: ['classroom_list_in_course'] })
        queryClient.invalidateQueries({ queryKey: ['joined_classroom_list'] })
      },
      onSuccess: () => {
        setRegisterSuccess(true)
        setRegisterError(false)
      },
      onError: () => {
        setRegisterSuccess(false)
        setRegisterError(true)
      }
    })
  }

  //! Handle unregistration
  const unregisterMutation = useMutation({
    mutationFn: memberApi.removeClassroom
  })
  const unregisterClassroom = () => {
    setDialog(true)
    setExcuting(true)
    unregisterMutation.mutate(classroom._id, {
      onSettled: () => {
        setExcuting(false)
        queryClient.invalidateQueries({ queryKey: ['classroom_list_in_course'] })
        queryClient.invalidateQueries({ queryKey: ['joined_classroom_list'] })
      },
      onSuccess: () => {
        setUnRegisterSuccess(true)
        setRegisterError(false)
      },
      onError: () => {
        setUnRegisterSuccess(false)
        setRegisterError(true)
      }
    })
  }

  //! Check if a classroom is registerd
  // console.log(joinedClassroomList)
  const isRegistered = joinedClassroomList.includes(classroom._id)

  //! Get student quantity
  const memberList = classroom.members ? classroom.members : []
  const studentList = memberList.filter((member) => {
    return member.role == 0
  })

  return (
    <div className='bg-webColor100 rounded-md p-2 space-y-2'>
      <p className='uppercase font-medium text-lg text-center desktop:text-xl space-x-1.5'>
        <span className=''>Lớp</span>
        <span className=''>{generateClassroomName(classroom._id)}</span>
      </p>
      <div className='flex space-x-1'>
        <span className='text-primaryText font-medium'>{startTime.toString() + ':00'}</span>
        <span className=''>đến</span>
        <span className='text-primaryText font-medium'>{endTime.toString() + ':00'}</span>
      </div>
      <div className='flex space-x-1'>
        <span className='text-primaryText font-medium'>{DaysInWeekEnum[day]}</span>
        <span className=''>các tuần</span>
      </div>

      <div className='flex space-x-2 items-center'>
        <span className='opacity-60'>Thành viên: </span>
        <span className='text-primaryText font-medium flex space-x-0.5 items-center'>
          <span>{studentList.length}</span>
          <span className='text-xl'>/</span>
          <span>{classroom.limit + studentList.length}</span>
        </span>
      </div>

      {canRegister && (
        <div className='w-full justify-center flex min-h-8'>
          {!isRegistered && (
            <button
              disabled={courseIsRegisterd}
              onClick={registerClassroom}
              className='flex bg-unhoverBg hover:bg-hoveringBg disabled:hover:bg-unhoverBg disabled:opacity-50 rounded-lg items-center justify-center py-1 px-3'
            >
              Đăng ký
            </button>
          )}

          {isRegistered && (
            <button
              onClick={unregisterClassroom}
              className='flex bg-alertRed/80 hover:bg-alertRed rounded-lg items-center justify-center py-1 px-3'
            >
              Hủy đăng ký
            </button>
          )}
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
              {invalidTime && (
                <div className='space-y-2 text-center text-lg'>
                  <p className='font-medium flex space-x-1.5 text-alertRed'>
                    <span className='uppercase'>trùng lịch học với lớp </span>
                    <span className='text-primaryText'>{duplicatedCourseTime}</span>
                  </p>
                  <p className=''>Vui lòng điều chỉnh lại thời gian các lớp học</p>
                </div>
              )}

              {registerSuccess && (
                <p className='text-center text-xl shrink-0 font-medium uppercase leading-6 text-successGreen'>
                  Đăng ký lớp học thành công
                </p>
              )}

              {unRegisterSuccess && (
                <p className='text-center text-xl shrink-0 font-medium uppercase leading-6 text-successGreen'>
                  Đã hủy đăng ký
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
