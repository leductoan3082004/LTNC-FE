import { useContext } from 'react'
import { PersonalscoreContext } from 'src/contexts/personalscore.context'

export default function PersonalChangeFormBtn() {
  const { form, setForm } = useContext(PersonalscoreContext)

  return (
    <button
      className='w-1/6 px-2 text-darkText py-2 rounded-xl bg-unhoverBg hover:bg-hoveringBg hover:border-primaryText absolute bottom-4 right-4'
      onClick={() => setForm(!form)}
    >
      {form ? 'Theo bảng' : 'Theo biểu đồ'}
    </button>
  )
}
