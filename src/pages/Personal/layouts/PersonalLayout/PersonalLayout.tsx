import React from 'react'
import PersonalNavBar from '../../components/PersonalNavBar'

interface Props {
  children?: React.ReactNode
}

export default function PersonalLayout({ children }: Props) {
  return (
    <div className='container py-4'>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-3'>
          <PersonalNavBar />
        </div>
        <div className='col-span-9'>
          <div className='pl-4'>{children}</div>
        </div>
      </div>
    </div>
  )
}
