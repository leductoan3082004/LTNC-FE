import { useQuery } from "@tanstack/react-query"
import authApi from "src/apis/auth.api"
import { generateID } from "src/utils/utils"
import { useContext } from "react"
import { AppContext } from "src/contexts/app.context"
import { Bar, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ComposedChart } from 'recharts'
import { ScoreForYear } from "src/types/utils.type"

interface ScoreAllYear {
  year: number
  allScore: number
  allCredit: number
}


export default function PersonalScoreAllYear() {
  const { profile } = useContext(AppContext)
  

  const { data: joinedClassroomListData } = useQuery({
    queryKey: ['joined_classroom_list'],
    queryFn: () => authApi.getJoinedClassroomList(),
  })
  const joinedClassroomList = joinedClassroomListData?.data.data || []

  const scoreAllYears: ScoreAllYear[] = []


  for (const classroom of joinedClassroomList) {
    const year = new Date(classroom.course.end_time).getFullYear()
    const obj = scoreAllYears.find((obj) => { return obj.year == year })
    if (obj) {
      const score = (classroom.member.attendance * classroom.course.attendance_ratio + classroom.member.lab * classroom.course.lab_ratio + classroom.member.midterm * classroom.course.midterm_ratio + classroom.member.final * classroom.course.final_ratio) / 100
      obj.allScore = obj.allScore + score * classroom.course.credit
      obj.allCredit = obj.allCredit + classroom.course.credit
    }
    else {
      const score = (classroom.member.attendance * classroom.course.attendance_ratio + classroom.member.lab * classroom.course.lab_ratio + classroom.member.midterm * classroom.course.midterm_ratio + classroom.member.final * classroom.course.final_ratio) / 100
      scoreAllYears.push({
        year: year,
        allScore: score * classroom.course.credit,
        allCredit: classroom.course.credit
      })
    }
  }
  const data: ScoreForYear[] = scoreAllYears.map((s) => {
    return{
      year : s.year,
      score: s.allScore / s.allCredit      
    }
  })

  data.sort((a, b) => a.year - b.year);


  return (
    <div>
      <div className='items-center justify-center py-10 bg-webColor200'>

        <div className='container pb-4'>
          <div className='border h-9 border-transparent flex items-center py-4 text-lg desktop:text-xl font-bold text-darkText text-start '>
            <div className='w-1/4 text-left pr-4'> Tài Khoản </div>
          </div>
          <div className='border h-9 flex border-transparent items-center py-4 text-lg desktop:text-xl font-bold text-darkText text-start6 '>
            <div className='w-1/4 text-left pr-4'>Tên sinh viên: </div>
            <div className='border rounded-md border-transparent w-3/5 h-10 pt-2.5 px-4'>{profile?.name}</div>
          </div>
          <div className='border h-9 border-transparent flex items-center py-4 text-lg desktop:text-xl font-bold text-darkText text-start '>
            <div className='w-1/4 text-left pr-4'>Mã số sinh viên: </div>
            <div className='border rounded-md border-transparent w-3/5 h-10 pt-2.5 px-4'>{generateID(profile?._id || '')}</div>

          </div>
        </div>
      </div>
      <div className='bg-webColor100 py-4 px-6 space-y-4 text-darkText'>
        <div
          className='py-2 flex justify-center items-center w-full uppercase text-lg desktop:text-2xl font-semibold shrink-0 '>Điểm trung bình qua từng năm
        </div>
        <ComposedChart width={730} height={250} data={data}>
          <XAxis dataKey="year" />
          <YAxis domain={[0, 10]} tickCount={7} />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar dataKey="score" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </div>


    </div>
  )
}