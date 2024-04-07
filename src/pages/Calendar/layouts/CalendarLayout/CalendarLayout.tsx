import { CalendarContext } from 'src/contexts/calendar.context'
import CalendarSearchingBar from '../../components/CalendarSearchingBar'
import CalendarSorting from '../../components/CalendarSorting'
import { useContext } from 'react'
import PathBar from 'src/components/PathBar'

interface Props {
  children?: React.ReactNode
}

export default function CalendarLayout({ children }: Props) {
  const { calendarPath } = useContext(CalendarContext)

  return (
    <div className='bg-mainBg py-4 desktop:py-8'>
      <div className='container'>
        <PathBar pathList={calendarPath} />
        <div className='flex-col desktop:flex-row flex desktop:justify-between desktop:items-center space-y-4 desktop:space-y-0 desktop:space-x-8'>
          <div className=''>
            <CalendarSorting />
          </div>
          <div className='w-full tablet:w-6/12 desktop:w-4/12'>
            <CalendarSearchingBar />
          </div>
        </div>
        <div className='py-8'>{children}</div>
      </div>
    </div>
  )
}
