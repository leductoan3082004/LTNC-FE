import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSection from 'src/components/LoadingSection'
import mainPath from 'src/constants/path'
import { CalendarContext } from 'src/contexts/calendar.context'

const boo = false

export default function CalendarByYear() {
  const { academicYear, setCalendarPath } = useContext(CalendarContext)

  //! SET PATH LIST
  useEffect(() => {
    setCalendarPath([
      { pathName: 'Thời Khóa biểu', url: mainPath.calendar },
      { pathName: `Năm học ${academicYear}`, url: `${mainPath.calendar}/${academicYear}` }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
      <div className='py-2 flex justify-center items-center w-full text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '>
        {`Năm học: ${academicYear}`}
      </div>
      <div className='w-full flex justify-center'>
        <div className='border-t-2 border-primaryText w-6/12 desktop:w-4/12'></div>
      </div>
      <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
        {boo && <LoadingSection />}
        {!boo &&
          <div>
            <div className='overflow-x-auto'>
              <table className='table-auto w-full text-lg desktop:text-xl  text-darkText text-start'>
                <thead>
                  <tr>
                    <th className='px-4 py-2 uppercase'>Mã MH</th>
                    <th className='px-4 py-2 uppercase'>Tên môn học</th>
                    <th className='px-4 py-2 uppercase'>Giờ học</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index}>
                        <td className='border border-black px-4 py-2 text-center text-lg'>{index + 1}</td>
                        <td className='border border-black px-4 py-2 text-center '>Lập trình nâng cao</td>
                        <td className='border border-black px-4 py-2 text-center'>0h - 2h</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
