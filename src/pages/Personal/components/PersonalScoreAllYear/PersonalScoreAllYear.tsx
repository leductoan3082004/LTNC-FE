import { useQuery } from "@tanstack/react-query"
import authApi from "src/apis/auth.api"




export default function PersonalScoreAllYear() {

    const { data: joinedClassroomListData } = useQuery({
        queryKey: ['joined_classroom_list'],
        queryFn: () => authApi.getJoinedClassroomList()
      })
      const joinedClassroomList = joinedClassroomListData?.data.data
    
    




    return (
        <div className='bg-webColor100 py-4 px-6 space-y-4 text-darkText'>
      <div
        className='py-2 flex justify-center items-center w-full hover:text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '>
        gdfvsdcasgfhjk
      </div>
      
    </div>
    )
}