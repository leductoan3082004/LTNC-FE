import classNames from 'classnames'
import { range } from 'lodash'
import React, { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import { userRoles } from 'src/constants/userRoles'
import { AdminCreateUserSchema } from 'src/rules/user.rule'
import ErrorSection from '../ErrorSection'

type FormData = AdminCreateUserSchema
interface Props {
  setRole: React.Dispatch<React.SetStateAction<number>>
}

export default function AdminCreateUserForm({ setRole }: Props) {
  //! Use form context
  const {
    register,
    formState: { errors }
  } = useFormContext<FormData>()

  const handleChooseRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelector } = event.target
    for (const i in userRoles) {
      if (userRoles[i] == valueFromSelector) {
        setRole(+valueFromSelector)
      }
    }
  }

  //! Styles
  const inputFieldStyle = 'grid grid-cols-4 tablet:px-20 desktop:px-40 items-center gap-2 py-1 px-2'
  const titleStyle = 'text-xs col-span-1 tablet:text-sm font-medium space-x-1 uppercase lg:text-base '
  const inputStyle =
    'text-primaryText bg-white py-1 px-2 col-span-3 text-base lg:text-lg rounded-lg outline-none focus:outline-primaryText'

  return (
    <Fragment>
      <Input
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-red-600': Boolean(errors.username)
        })}
        errorClassName='hidden'
        register={register}
        name='username'
        autoComplete='false'
        errorSection={<ErrorSection errorMessage={errors.username?.message} />}
      >
        <div className={titleStyle}>
          <span className='opacity-60'>Tài khoản</span>
          <span className='text-alertRed text-lg'>*</span>
        </div>
      </Input>

      <Input
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-red-600': Boolean(errors.password)
        })}
        errorClassName='hidden'
        register={register}
        name='password'
        autoComplete='false'
        errorSection={<ErrorSection errorMessage={errors.password?.message} />}
      >
        <div className={titleStyle}>
          <span className='opacity-60'>Mật khẩu</span>
          <span className='text-alertRed'>*</span>
        </div>
      </Input>

      <Input
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-red-600': Boolean(errors.name)
        })}
        errorClassName='hidden'
        register={register}
        name='name'
        autoComplete='false'
        errorSection={<ErrorSection errorMessage={errors.name?.message} />}
      >
        <div className={titleStyle}>
          <span className='opacity-60'>Họ tên</span>
          <span className='text-alertRed'>*</span>
        </div>
      </Input>

      <Input
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-red-600': Boolean(errors.phone)
        })}
        errorClassName='hidden'
        register={register}
        name='phone'
        autoComplete='false'
        errorSection={<ErrorSection errorMessage={errors.phone?.message} />}
      >
        <div className={titleStyle}>
          <span className='opacity-60'>SĐT</span>
          <span className='text-alertRed'>*</span>
        </div>
      </Input>

      <Input
        className={inputFieldStyle}
        inputClassName={classNames(inputStyle, {
          'outline-red-600': Boolean(errors.address)
        })}
        errorClassName='hidden'
        register={register}
        name='address'
        autoComplete='false'
        errorSection={<ErrorSection errorMessage={errors.address?.message} />}
      >
        <div className={titleStyle}>
          <span className='opacity-60'>Địa chỉ</span>
          <span className='text-alertRed'>*</span>
        </div>
      </Input>

      <div className={inputFieldStyle}>
        <div className={titleStyle}>
          <span className='opacity-60'>Vai trò</span>
          <span className='text-alertRed'>*</span>
        </div>
        <div className={inputStyle}>
          <select
            onChange={handleChooseRole}
            name='year'
            className='text-primaryText appearance-none w-full outline-none cursor-pointer hover:border-primaryBlue'
          >
            <option disabled className='uppercase text-lg font-semibold'>
              Vai trò
            </option>
            {range(0, 3).map((role) => (
              <option value={role} key={role} className='text-darkText/80'>
                {userRoles[role]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Fragment>
  )
}
