import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { personalPath } from 'src/constants/path'
import { PersonalscoreContext } from 'src/contexts/personalscore.context'
import { Bar, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ComposedChart } from 'recharts'
interface Props {
  year: number
}

export default function PersonalScoreSortingByYearColumn({ year }: Props) {
  const { setAcademicYear, joinedClassroomList } = useContext(PersonalscoreContext)
  const navigate = useNavigate()

  //! HANDLE CHOOSE YEAR
  const handleSelectYear = () => {
    setAcademicYear(year.toString())
    navigate({ pathname: `${personalPath.score}/${year}` })
  }

  const joinedClassroomListByYear = joinedClassroomList.filter((classroom) => {
    return new Date(classroom.course.start_time).getFullYear() == year
  })

  const data = joinedClassroomListByYear.map((classroom) => {
    const score =
      (classroom.member.attendance * classroom.course.attendance_ratio +
        classroom.member.lab * classroom.course.lab_ratio +
        classroom.member.midterm * classroom.course.midterm_ratio +
        classroom.member.final * classroom.course.final_ratio) /
      1000
    return {
      name: classroom.course.course_name,
      score: score
    }
  })

  if (joinedClassroomListByYear.length == 0) return

  return (
    <div className='bg-webColor100 py-4 px-6 space-y-4 text-darkText'>
      <button
        onClick={handleSelectYear}
        className='py-2 flex justify-center items-center w-full hover:text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '
      >
        {`Năm học: ${year}`}
      </button>
      <ComposedChart width={730} height={250} data={data}>
        <XAxis dataKey='name' />
        <YAxis domain={[0, 10]} tickCount={7} />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke='#f5f5f5' />
        <Bar name='Điểm' dataKey='score' barSize={20} fill='#413ea0' />
      </ComposedChart>
    </div>
  )
}
