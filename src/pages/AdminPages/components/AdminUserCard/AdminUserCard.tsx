import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { User } from 'src/types/user.type'
import { generateID } from 'src/utils/utils'

interface Props {
  user: User
  handleClick?: () => void
}

export default function AdminUserCard({
  user,
  handleClick = () => {
    return
  }
}: Props) {
  const infos = [
    {
      name: 'Tên',
      info: user.name
    },
    {
      name: 'MSSV',
      info: generateID(user._id)
    }
  ]

  return (
    <button
      onClick={handleClick}
      className='rounded-md w-full items-center justify-center p-4 space-y-4 bg-webColor100 hover:bg-webColor300'
    >
      <div className='w-full flex justify-center'>
        <div className='flex bg-slate-300 rounded-full items-center justify-center p-4'>
          <FontAwesomeIcon icon={faUser} className='text-white h-10 w-10' />
        </div>
      </div>

      <div className=''></div>

      <div className='space-y-2'>
        {infos.map((info, index) => (
          <div key={index} className='grid grid-cols-4 gap-2 text-left items-center'>
            <span className='col-span-1 opacity-70 text-sm'>{info.name}</span>
            <span className='col-span-3 '>{info.info}</span>
          </div>
        ))}
      </div>
    </button>
  )
}
