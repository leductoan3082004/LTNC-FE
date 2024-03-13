import MainFooter from 'src/components/MainFooter'
import MainHeader from 'src/components/MainHeader'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div
      className='bg-mainBg  flex flex-col h-full justify-between shrink-0 min-h-full'
      style={{
        minHeight: 'inherit'
      }}
    >
      <div className='fixed z-10 h-12 desktop:h-16 w-full'>
        <MainHeader />
      </div>
      <div className='pt-12 desktop:pt-16 '>{children}</div>
      <div className=''>
        <MainFooter />
      </div>
    </div>
  )
}
