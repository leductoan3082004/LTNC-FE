import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { CalendarContext } from 'src/contexts/calendar.context'

interface Props {
  year: number
}

export default function CalendarSortingtByYear({ year }: Props) {
  const { setAcademicYear } = useContext(CalendarContext)

  const navigate = useNavigate()
  //! HANDLE CHOOSE YEAR
  const handleSelectYear = () => {
    setAcademicYear(year.toString())
    navigate({ pathname: `${mainPath.calendar}/${year}` })
  }




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
  )
}
