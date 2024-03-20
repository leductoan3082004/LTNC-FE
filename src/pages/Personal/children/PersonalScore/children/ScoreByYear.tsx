import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSection from 'src/components/LoadingSection'
import { personalPath } from 'src/constants/path'
import { PersonalscoreContext } from 'src/contexts/personalscore.context' 

const boo = false

export default function ScoreByYear() {
  const { academicYear } = useContext(PersonalscoreContext)

  //! HANDLE CHOOSE COURSE
  const navigate = useNavigate()
  const chooseCourse = (courseName: string) => () => {
    navigate({ pathname: `${personalPath}/${academicYear}/${courseName}` })
  }

  return (
    <div className='bg-webColor100 rounded-lg py-4 px-6 space-y-4 text-darkText'>
      <div className='py-2 flex justify-center items-center w-full text-primaryText uppercase text-lg desktop:text-2xl font-semibold shrink-0 '>
        {`Năm học: ${academicYear}`}
      </div>

      <div className='rounded-lg bg-white px-4 flex flex-col'>
        {boo && <LoadingSection />}
        {!boo &&
          Array(5)
            .fill(0)
            .map((_, index) => (
              <button
                onClick={chooseCourse(index.toString())}
                className='border-b last:border-none py-4 border-primaryText/80 hover:text-primaryText text-lg desktop:text-xl uppercase text-darkText text-start'
                key={index}
              ><div className="overflow-x-auto">
              <table className="table-auto w-full">
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
                    <td className="border px-4 py-2">1</td>
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
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
              </button>
            ))}
      </div>
    </div>
  )
}
