import { useQuery } from "@tanstack/react-query"
import authApi from "src/apis/auth.api"
import { Bar, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ComposedChart } from 'recharts'
import { ScoreForYear } from "src/types/utils.type"
import PersonalInScore from "../PersonalInScore"

interface ScoreAllYear {
  year: number
  allScore: number
  allCredit: number
}


export default function PersonalScoreAllYear() {


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
    return {
      year: s.year,
      score: s.allScore / s.allCredit
    }
  })

  data.sort((a, b) => a.year - b.year);


  return (
    <div>
      <div className=" bg-webColor200 justify-between items-end relative py-4">
        <PersonalInScore />
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
          <Bar name='Điểm' dataKey="score" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </div>


    </div>
  )
}