import { useViewport } from 'src/hooks/useViewport'

export default function MainHeader() {
  const viewport = useViewport()
  const isSmall = viewport.width < 768

  //? Style
  const popoverStyle = 'border border-black/20 rounded-lg min-w-52 py-3 px-2 text-sm dekstop:text-base'
  const wrapperStyle = 'text-darkText font-medium flex flex-col space-y-1'
  const itemStyle =
    'tablet:hover:text-white hover:text-black px-4 tablet:px-3 py-1.5 duration-200 tablet:hover:bg-primaryBlueHovering/80 tablet:rounded-md'

  return (
    <div className='top-0 z-10 flex h-12 w-full items-center bg-headerBg shadow-md duration-200 tablet::h-14'>
      <div className='container'>
        <div className='flex justify-between items-center'></div>
      </div>
    </div>
  )
}
