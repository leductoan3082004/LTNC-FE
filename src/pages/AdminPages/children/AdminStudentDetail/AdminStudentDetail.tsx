import classNames from 'classnames'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from 'src/components/BackButton'
import { adminPath } from 'src/constants/path'
import { ScoreQualityEnum } from 'src/constants/scoreQuality'
import { AdminContext } from 'src/contexts/admin.context'
import { InfomationField } from 'src/types/utils.type'
import { checkScoreQuality } from 'src/utils/student.util'
import { generateID } from 'src/utils/utils'

export default function AdminStudentDetail() {
  const navigate = useNavigate()
  //! Get student detail
  const { currentStudent, currentCourse } = useContext(AdminContext)
  useEffect(() => {
    if (!currentStudent || !currentCourse) {
      navigate({ pathname: adminPath.courses })
    }
  }, [currentCourse, currentStudent, navigate])

  let infos: InfomationField[] = []

  if (currentStudent) {
    infos = [
      {
        title: 'Họ tên',
        info: currentStudent.name
      },
      {
        title: 'MSSV',
        info: generateID(currentStudent._id)
      },
      {
        title: 'SĐT',
        info: currentStudent.phone
      },
      {
        title: 'Địa chỉ',
        info: currentStudent.address
      },
      {
        title: 'Điểm chuyên cần',
        info: currentStudent.attendance
      },
      {
        title: 'Điểm lab',
        info: currentStudent.lab
      },
      {
        title: 'Điểm giữa kỳ',
        info: currentStudent.midterm
      },
      {
        title: 'Điểm cuối kỳ',
        info: currentStudent.final
      }
    ]
  }

  let averageScore = 0

  if (currentStudent) {
    averageScore = currentStudent.attendance + currentStudent.lab + currentStudent.midterm + currentStudent.final
  }
  const scoreQuality = checkScoreQuality(averageScore)

  return (
    <div className='space-y-8'>
      <BackButton />
      <div className='space-y-4 px-4 tablet:px-10 desktop:px-20'>
        <p className='text-center font-semibold uppercase text-xl desktop:text-3xl tracking-widest text-primaryText'>
          Thông tin sinh viên
        </p>

        <div className='grid desktop:text-xl text-lg grid-cols-4 gap-4'>
          <p className='col-span-1 opacity-60'>Môn học</p>
          <p className='col-span-3 font-medium uppercase'>{currentCourse?.course_name}</p>
        </div>
        <div className='grid desktop:text-xl text-lg grid-cols-4 gap-4'>
          <p className='col-span-1 opacity-60'>Điểm tổng kết môn học</p>
          <p
            className={classNames('font-medium col-span-3', {
              'text-weakColor': scoreQuality == ScoreQualityEnum.weak,
              'text-normalColor': scoreQuality == ScoreQualityEnum.normal,
              'text-fineColor': scoreQuality == ScoreQualityEnum.fine,
              'text-goodColor': scoreQuality == ScoreQualityEnum.good
            })}
          >
            {averageScore}
          </p>
        </div>

        {infos.map((info, index) => (
          <div key={index} className='grid desktop:text-lg grid-cols-4 gap-4'>
            <p className='col-span-1 opacity-60'>{info.title}</p>
            <p className='col-span-3'>{info.info}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
