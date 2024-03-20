import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {personalPath} from 'src/constants/path'
import { PersonalscoreContext } from 'src/contexts/personalscore.context' 

interface Props {
  year: number
}

export default function ScoreSortingtByYear({ year }: Props) {
  const { setAcademicYear } = useContext(PersonalscoreContext)

  const navigate = useNavigate()
  //! HANDLE CHOOSE YEAR
  const handleSelectYear = () => {
    setAcademicYear(year.toString())
    navigate({ pathname: `${personalPath.score}/${year}` })
  }

  //! HANDLE CHOOSE COURSE
  const chooseYear = () => () => {
    setAcademicYear(year.toString())
    navigate({ pathname: `${personalPath.score}/${year}/$` })
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
      <div className='flex flex-col'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <button
              onClick={chooseYear()}
              className='border-b last:border-none py-4 border-primaryText/80 hover:text-primaryText text-lg desktop:text-xl uppercase text-darkText text-start'
              key={index}
            >
              <div className="overflow-x-auto">
                <table className='table-auto w-full'>
                  <thead>
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Age</th>
                      <th className="px-4 py-2">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border px-4 py-2'>1</td>
                      <td className="border px-4 py-2">John Doe</td>
                      <td className="border px-4 py-2">30</td>
                      <td className="border px-4 py-2">john@example.com</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">2</td>
                      <td className="border px-4 py-2">Jane Doe</td>
                      <td className="border px-4 py-2">25</td>
                      <td className="border px-4 py-2">jane@example.com</td>
                    </tr>
                  </tbody>
                </table>
            </div>
            </button>
          ))}
      </div>
    </div>
  )
}
