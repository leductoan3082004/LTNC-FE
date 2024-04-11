import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { ClassroomContext } from 'src/contexts/classroom.context'
import { User } from 'src/types/user.type'
import { getProfileFromLS } from 'src/utils/auth'

const headerTable = ['Mục điểm', 'Điểm', 'Contribution to course total']
const titleBody = ['Chuyên cần', 'Lab', 'Giữa kỳ', 'Cuối kỳ', 'Tổng kết']

export default function ClassroomScoreForStudent() {
  const { currentClassroom } = useContext(ClassroomContext)
  let all_score = 0
  if (currentClassroom) {
    all_score =
      (currentClassroom.member.attendance * currentClassroom.course.attendance_ratio +
        currentClassroom.member.lab * currentClassroom.course.lab_ratio +
        currentClassroom.member.midterm * currentClassroom.course.midterm_ratio +
        currentClassroom.member.final * currentClassroom.course.final_ratio) /
      1000
  }

  const datas = currentClassroom
    ? [
        {
          Name: 'Chuyên cần',
          Score: currentClassroom.member.attendance / 10,
          contribution: currentClassroom.course.attendance_ratio
        },
        {
          Name: 'lab',
          Score: currentClassroom.member.lab / 10,
          contribution: currentClassroom.course.lab_ratio
        },
        {
          Name: 'Giữa kỳ',
          Score: currentClassroom.member.midterm / 10,
          contribution: currentClassroom.course.midterm_ratio
        },
        {
          Name: 'Cuối kỳ',
          Score: currentClassroom.member.final / 10,
          contribution: currentClassroom.course.final_ratio
        },
        {
          Name: 'Tổng kết',
          Score: all_score,
          contribution: 100
        }
      ]
    : []

  const profile: User = getProfileFromLS()

  return (
    <div className='max-w-[1140px] mx-auto mt-8 '>
      <div className='flex items-center'>
        <FontAwesomeIcon icon={faCircleUser} className='h-8 w-8 pr-2 text-[#5488B4]' />
        <div className='text-2xl uppercase font-semibold text-[#5488B4]'>{profile?.name}</div>
      </div>
      <div className='bg-[#F8F9FA] p-3 mt-8'>
        <div className='grid grid-cols-[repeat(3,1fr)]'>
          {headerTable.map((header, index) => (
            <div key={index} className={`text-center font-semibold p-3`}>
              {header}
            </div>
          ))}
        </div>
        <div>
          <div className='grid grid-cols-[repeat(3,1fr)]'>
            <div>
              {titleBody.map((title, index) => (
                <div
                  key={index}
                  className={`text-center p-3 mb-2 border-l-[#ccc] ${index === titleBody.length - 1 ? 'font-bold bg-[rgb(230_238_246)]' : 'bg-[white]'} border-l border-solid border-y-[#ccc] border-t border-b`}
                >
                  {title}
                </div>
              ))}
            </div>
            <div>
              {datas &&
                datas?.map((data, index) => (
                  <div
                    key={index}
                    className={`p-3 text-center ${index === datas.length - 1 ? 'font-bold bg-[rgb(230_238_246)]' : 'bg-[white]'} mb-2  border-y-[#ccc] border-t border-solid border-b`}
                  >
                    {data.Score}
                  </div>
                ))}
            </div>
            <div>
              {datas &&
                datas?.map((data, index) => (
                  <div
                    key={index}
                    className={`p-3 text-center ${index === datas.length - 1 ? 'font-bold bg-[rgb(230_238_246)]' : 'bg-[white]'} mb-2  border-y-[#ccc] border-t border-solid border-b`}
                  >
                    {data.contribution} %
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
