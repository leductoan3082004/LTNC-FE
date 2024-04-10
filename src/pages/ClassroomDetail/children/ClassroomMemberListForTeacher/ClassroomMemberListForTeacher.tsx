import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Fragment, useContext } from 'react'
import classroomApi from 'src/apis/classroom.api'
import LoadingSection from 'src/components/LoadingSection'
import { ClassroomContext } from 'src/contexts/classroom.context'
import ClassroomStudentCard from '../../components/ClassroomStudentCard'

export default function ClassroomMemberListForTeacher() {
  const { currentClassroom } = useContext(ClassroomContext)

  //! Get member list in classroom
  const { data: memberListData } = useQuery({
    queryKey: ['member_list', currentClassroom?.class._id],
    queryFn: () => classroomApi.getMemberListInClassromm({ classroom_id: currentClassroom?.class._id as string }),
    enabled: Boolean(currentClassroom)
  })
  const memberList = memberListData?.data.data
  const studentList = memberList ? memberList.filter((member) => member.role == 0) : []

  //! Style
  const cellStyle = 'border border-black/20 py-2 flex justify-center items-center font-semibold desktop:text-lg'

  return (
    <Fragment>
      {!memberList && <LoadingSection />}
      {!currentClassroom && (
        <div className='text-alertRed text-lg font-medium uppercase'>Không thể lấy thông tin lớp học</div>
      )}

      {memberList && currentClassroom && (
        <div className=''>
          <div className='grid grid-cols-10 bg-webColor100'>
            <p className={classNames(cellStyle, 'col-span-3')}>Họ tên</p>
            <p className={classNames(cellStyle, 'col-span-1')}>Chuyên cần</p>
            <p className={classNames(cellStyle, 'col-span-1')}>Lab</p>
            <p className={classNames(cellStyle, 'col-span-1')}>Giữa kỳ</p>
            <p className={classNames(cellStyle, 'col-span-1')}>Cuối kỳ</p>
            <p className={classNames(cellStyle, 'col-span-1 text-primaryText')}>Tổng kết</p>
            <p className={classNames(cellStyle, 'col-span-2')}></p>
          </div>
          {studentList.map((student) => (
            <ClassroomStudentCard key={student._id} student={student} classroom={currentClassroom} />
          ))}
        </div>
      )}
    </Fragment>
  )
}
