import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { personalPath } from 'src/constants/path'
import { PersonalscoreContext } from 'src/contexts/personalscore.context'

interface Props {
  year: number
}

export default function PersonalScoreSortingtByYear({ year }: Props) {
  const { setAcademicYear, joinedClassroomList } = useContext(PersonalscoreContext)
  const joinedClassroomListByYear = joinedClassroomList.filter((classroom) => {
    return new Date(classroom.course.start_time).getFullYear() == year
  })
  const navigate = useNavigate()
  //! HANDLE CHOOSE YEAR
  const handleSelectYear = () => {
    setAcademicYear(year.toString())
    navigate({ pathname: `${personalPath.score}/${year}` })
  }

  if (joinedClassroomListByYear.length == 0) return
  return (
    <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
      <button
        onClick={handleSelectYear}
        className='py-2 flex justify-center items-center w-full hover:text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '
      >
        {`Năm học: ${year}`}
      </button>
      <div className='w-full flex justify-center'>
        <div className='border-t-2 border-primaryText w-6/12 desktop:w-4/12'></div>
      </div>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full text-lg desktop:text-xl  text-darkText text-start'>
          <thead>
            <tr>
              <th className='px-4 py-2 uppercase'>STT</th>
              <th className='px-4 py-2 uppercase'>Tên môn học</th>
              <th className='px-4 py-2 uppercase'>Số tín chỉ</th>
              <th className='px-4 py-2 uppercase'>Điểm</th>
            </tr>
          </thead>
          <tbody>
            {joinedClassroomListByYear.map((classroom, index) => {
              const score =
                (classroom.member.attendance * classroom.course.attendance_ratio +
                  classroom.member.lab * classroom.course.lab_ratio +
                  classroom.member.midterm * classroom.course.midterm_ratio +
                  classroom.member.final * classroom.course.final_ratio) /
                1000
              return (
                <tr key={classroom.class._id}>
                  <td className='border border-black px-4 py-2 text-center text-lg'>{index + 1}</td>
                  <td className='border border-black px-4 py-2 text-center '>{classroom.course.course_name}</td>
                  <td className='border border-black px-4 py-2 text-center'>{classroom.course.credit}</td>
                  <td className='border border-black px-4 py-2 text-center'>{score}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
