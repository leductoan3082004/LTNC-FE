import { NavLink } from 'react-router-dom'
import mainPath from 'src/constants/path'
import { SlideShow } from 'src/components/SlideShow/Slideshow'
const Slides = [{ url: '/images/Slide_5.jpg', alt: 'Slide 5' }]

export default function HomePageBeforeLogin() {
  return (
    <div className='flex flex-col h-full justify-between shrink-0 '>
      <div className='max-w-1200 w-full aspect-w-10 aspect-h-6 mx-auto'>
        <SlideShow images={Slides} />
      </div>
      <div className='container'>
        <div className='w-full grid grid-cols-2 gap-4 items-center justify-between mt-40'>
          <div className='col-span-1 space-y-4 flex flex-col items-start-start'>
            <p className='text-4xl font-medium text-darkText upercase'>WELCOME TO HCM</p>

            <p className='text-4xl font-medium text-darkText uppercase'>University of technology</p>

            <div className=''>
              <NavLink
                to={mainPath.login}
                className='text-lightText font-bold text-2xl px-12 py-6 flex bg-unhoverBg hover:bg-hoveringBg justify-center items-center'
              >
                Sign up / Login
              </NavLink>
            </div>
          </div>
          <div className='col-span-1'>
            <img className='w-full justify-between h-1/2' src='/images/Slide_1.jpg' alt='HCMUT' />
          </div>
        </div>
      </div>
    </div>
  )
}
