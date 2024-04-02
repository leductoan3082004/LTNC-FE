import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { random } from 'lodash'
import { useLocation } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import classroomApi from 'src/apis/classroom.api'
import BackButton from 'src/components/BackButton'
import LoadingSection from 'src/components/LoadingSection'
import { Member } from 'src/types/classroom.type'
import { getIdFromUrl } from 'src/utils/utils'

function StudentCard({ student, index }: { student: Member; index: number }) {
  const averageScore = student.attendance + student.lab + student.midterm + student.final
  const weak = averageScore < 4.0
  const normal = averageScore >= 4.0 && averageScore < 6.0
  const fine = averageScore >= 6.0 && averageScore < 8.0
  const good = averageScore >= 8.0

  return (
    <button className='flex py-3 px-4 border-b space-x-2 border-black/20 items-center shadow-sm rounded-md bg-webColor100 hover:bg-webColor300'>
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

  const tempStudent: Member = {
    _id: random(1000000, 9999999).toString(),
    status: 0,
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    name: 'Le Toan',
    address: 'Ho Chi Minh',
    phone: '000-000-000',
    role: 0,
    attendance: 0.8,
    lab: 1.9,
    midterm: 2.0,
    final: 2.8
  }

  return (
    <div className='space-y-8'>
      <BackButton />

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
          <div className='rounded-lg border-black/20 p-4 bg-webColor100'>
            <p className='font-medium text-center text-lg desktop:text-xl uppercase'>Danh sách sinh viên</p>
            <div className='flex flex-col space-y-2'>
              {(Array(80).fill(tempStudent) as Member[]).map((student, index) => (
                <StudentCard key={index} student={student} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
