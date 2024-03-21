import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Fragment, InputHTMLAttributes, useState } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  inputClassName?: string
  errorClassName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function PasswordInput({
  name,
  register,
  className = 'bg-transparent flex justify-between items-center relative',
  errorMessage,
  rules,
  inputClassName = 'w-full rounded-sm border border-gray-300 p-3 outline-none outline',
  errorClassName = 'mt-1 min-h-[1.25rem] lg:min-h-[1.5rem] text-sm lg:text-base text-red-600',
  ...rest
}: Props) {
  const [visible, setVisible] = useState<boolean>(false)

  const registerResult = register && name ? register(name, rules) : {}
  return (
    <Fragment>
      <div className={classNames(className, { 'outline-alertRed': errorMessage })}>
        <input type={visible ? 'text' : 'password'} className={inputClassName} {...registerResult} {...rest} />
        {visible && (
          <button className='h-4 w-4' onClick={() => setVisible(false)}>
            <FontAwesomeIcon icon={faEyeSlash} />
          </button>
        )}
        {!visible && (
          <button className='h-4 w-4' onClick={() => setVisible(true)}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        )}
        <div className=''></div>
      </div>
      <div className={errorClassName}>{errorMessage}</div>
    </Fragment>
  )
}
