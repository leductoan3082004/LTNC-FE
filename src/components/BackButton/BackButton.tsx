import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

interface Props {
  customClassname?: string
}

export default function BackButton({
  customClassname = 'rounded-md bg-unhoverBg hover:bg-hoveringBg py-1.5 px-3 text-darkText'
}: Props) {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(-1)} className={customClassname}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  )
}
