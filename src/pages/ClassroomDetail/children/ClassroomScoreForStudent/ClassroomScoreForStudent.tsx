import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { User } from 'src/types/user.type'
import { getProfileFromLS } from 'src/utils/auth'

const headerTable = ['Mục điểm', 'Điểm', 'Contribution to course total']
const titleBody = ['Chuyên cần', 'Lab', 'Giữa kỳ', 'Cuối kỳ', 'Tổng kết']
const datas = [
  {
    ['id']: 1,
    ['point_section']: 'Toán rời rạc',
    ['point']: 10,
    ['contribution_to_course_total']: 1000
  },
  {
    ['id']: 1,
    ['point_section']: 'Toán rời rạc',
    ['point']: 10,
    ['contribution_to_course_total']: 1000
  },
  {
    ['id']: 1,
    ['point_section']: 'Toán rời rạc',
    ['point']: 10,
    ['contribution_to_course_total']: 1000
  },
  {
    ['id']: 1,
    ['point_section']: 'Toán rời rạc',
    ['point']: 10,
    ['contribution_to_course_total']: 1000
  },
  {
    ['id']: 1,
    ['point_section']: 'Toán rời rạc',
    ['point']: 10,
    ['contribution_to_course_total']: 1000
  }
]

export default function ClassroomScoreForStudent() {
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
                  className={`text-center p-3 mb-2 border-l-[#ccc] ${index === titleBody.length - 1 ? 'font-bold bg-[rgb(230_238_246)]' : 'bg-[white]'} border-l border-solid border-y-[#ccc] border-t border-solid border-b`}
                >
                  {title}
                </div>
              ))}
            </div>
            <div>
              {datas.map((data, index) => (
                <div
                  key={index}
                  className={`p-3 text-center ${index === datas.length - 1 ? 'font-bold bg-[rgb(230_238_246)]' : 'bg-[white]'} mb-2  border-y-[#ccc] border-t border-solid border-b`}
                >
                  {data.point}
                </div>
              ))}
            </div>
            <div>
              {datas.map((data, index) => (
                <div
                  key={index}
                  className={`p-3 text-center border-r-[#ccc] ${index === datas.length - 1 ? 'font-bold bg-[rgb(230_238_246)]' : 'bg-[white]'} border-r border-solid mb-2  border-y-[#ccc] border-t border-solid border-b`}
                >
                  {data.contribution_to_course_total}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
