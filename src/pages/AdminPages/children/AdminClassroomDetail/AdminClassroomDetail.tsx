import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import classroomApi from 'src/apis/classroom.api'
import { getIdFromUrl } from 'src/utils/utils'

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
  console.log(memberList)

  return <div>AdminClassroomDetail</div>
}
