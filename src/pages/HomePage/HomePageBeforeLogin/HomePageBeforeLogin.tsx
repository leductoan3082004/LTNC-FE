import React from 'react'
import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { SlideShow } from 'src/components/SlideShow/Slideshow'
const Slides = [
  { url: '/images/Slide_5.jpg', alt: 'Slide 5' },
  ]

export default function HomePageBeforeLogin() {

  return (
    
    <div className='flex flex-col h-full justify-between shrink-0 '>
      <div className='max-w-1200 w-full aspect-w-10 aspect-h-6 mx-auto'>
        <SlideShow images={Slides} />
        <a href='/' className='text-4xl'>
         </a>
      </div>
      <div className='container h-full flex gap-x-3'>
        <div className=' w-1/2 h-full'>
          <div className='pb-5 pl-5 pt-72 text-6xl text-darkText '>WELCOME TO DEF</div>

          <div className='pb-5 pl-5 text-6xl text-darkText'>UNIVERSITY</div>

          <div className=' pl-5 text-2xl text-primaryText'>
            join us in shaping the future through innovate education, cutting-edge research, and global collaboration
          </div>

          <NavLink
            to={mainPath.login}
            className='inline-block border text-lightText h-24 w-72 my-10 text-3xl mx-10 bg-darkText flex justify-center items-center px-6'
          >
            Sign up / Login
          </NavLink>
        </div>
        <div className='pt-40 w-1/2 h-full'>
          <img className=' w-full justify-between h-1/2' src='https://i.ibb.co/8xmc9tq/thu-vien.jpg' alt='' />
                </div>
      </div>
    </div>
  )
}
