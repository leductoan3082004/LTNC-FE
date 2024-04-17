import { useQuery } from '@tanstack/react-query'
import { ceil } from 'lodash'
import { useContext } from 'react'
import { Bar, CartesianGrid, ComposedChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import classroomApi from 'src/apis/classroom.api'
import { ScoreQualityTitle } from 'src/constants/scoreQuality'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { checkScoreQuality } from 'src/utils/student.util'

export default function ClassroomScoreStatisticForTeacher() {
  const { currentClassroom } = useContext(ClassroomContext)

  //! Get memeber list in classroom
  const { data: memberListData } = useQuery({
    queryKey: ['member_list', currentClassroom?.class._id],
    queryFn: () => classroomApi.getMemberListInClassromm({ classroom_id: currentClassroom?.class._id as string }),
    enabled: Boolean(currentClassroom)
  })
  const memberList = memberListData?.data.data
  const studentList = memberList ? memberList.filter((member) => member.role == 0) : []

  //! Calculate score
  const attendanceRatio = currentClassroom?.course.attendance_ratio as number
  const labRatio = currentClassroom?.course.lab_ratio as number
  const midtermRatio = currentClassroom?.course.midterm_ratio as number
  const finalRatio = currentClassroom?.course.final_ratio as number

  const scoreList = studentList.map((student) => {
    const score =
      (student.attendance * attendanceRatio +
        student.lab * labRatio +
        student.midterm * midtermRatio +
        student.final * finalRatio) /
      1000
    return score
  })

  //! Generate static data
  const scoreMap = new Map([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [10, 0]
  ])

  const qualityMap = new Map([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0]
  ])

  scoreList.forEach((score) => {
    const quality = checkScoreQuality(score)
    qualityMap.set(quality, (qualityMap.get(quality) as number) + 1)

    const roundedScore = ceil(score)
    scoreMap.set(roundedScore, (scoreMap.get(roundedScore) as number) + 1)
  })

  const data = Array.from(scoreMap, ([score, quantity]) => ({ range: `${score - 1} - ${score}`, quantity }))
  const qualityData = Array.from(qualityMap, ([quality, quantity]) => ({
    title: ScoreQualityTitle.get(quality) as string,
    quantity
  }))

  return (
    <div className='w-full flex justify-center space-x-10 items-center py-8'>
      <ComposedChart width={800} height={300} data={data}>
        <XAxis dataKey='range' />
        <YAxis domain={[0, 10]} tickCount={7} />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke='#f5f5f5' />
        <Bar name='Số sinh viên' dataKey='quantity' barSize={20} fill='#413ea0' />
      </ComposedChart>

      <div className={'text-lg desktop:text-xl border rounded-lg border-black/20 p-4 bg-webColor100'}>
        {qualityData.map((d, index) => (
          <div key={index} className={'w-full font-medium grid grid-cols-2 gap-4'}>
            <p className={'col-span-1 text-right'}>{d.title}</p>
            <p className='col-span-1'>{d.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
