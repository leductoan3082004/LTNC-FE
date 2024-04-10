import { useContext } from 'react'
import { PersonalscoreContext } from 'src/contexts/personalscore.context'
import PersonalInScore from '../../components/PersonalInScore'
import { Bar, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ComposedChart } from 'recharts'



export default function PersonalScoreByYear() {
  const { academicYear, form, joinedClassroomList } = useContext(PersonalscoreContext)

  const joinedClassroomListByYear = joinedClassroomList.filter((classroom)=>{
    return new Date(classroom.course.start_time).getFullYear() == parseInt(academicYear)
  })
  const data = joinedClassroomListByYear.map((classroom) => {
    const score = (classroom.member.attendance * classroom.course.attendance_ratio + classroom.member.lab * classroom.course.lab_ratio + classroom.member.midterm * classroom.course.midterm_ratio + classroom.member.final * classroom.course.final_ratio) / 100
    return ({
      name: classroom.course.course_name,
      Điểm: score
    })
  })
  return (
    <div>
      <PersonalInScore />
      {!form && (
        <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
          <div
            className='py-2 flex justify-center items-center w-full uppercase text-lg desktop:text-2xl font-semibold shrink-0 '
          >
            {`Năm học: ${academicYear}`}
          </div>
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
                  const score = (classroom.member.attendance * classroom.course.attendance_ratio + classroom.member.lab * classroom.course.lab_ratio + classroom.member.midterm * classroom.course.midterm_ratio + classroom.member.final * classroom.course.final_ratio) / 100
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
      )}
      {form && (
        <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
          <div
            className='py-2 flex justify-center items-center w-full uppercase text-lg desktop:text-2xl font-semibold shrink-0 '>
            {`Năm học: ${academicYear}`}
          </div>
          <ComposedChart width={730} height={250} data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} tickCount={7} />
            <Tooltip labelFormatter={value => parseFloat(value).toFixed(2)}/>
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="Điểm" barSize={20} fill="#413ea0" />
          </ComposedChart>
        </div>
      )}
    </div>
  )
}
