export default function ClassroomInCourseDetail() {
  return (
    <div className='bg-webColor100 rounded-md p-2 space-y-2'>
      <p className='uppercase font-medium text-lg desktop:tetx-xl flex space-x-2'>
        <span className=''>lop</span>
        <span className=''>L01</span>
      </p>
      <div className='flex space-x-2'>
        <span className='text-primaryText'>7:00 AM</span>
        <span className=''>đến</span>
        <span className='text-primaryText'>9:00 AM</span>
      </div>
      <div className='flex space-x-2'>
        <span className='text-primaryText'>Thứ hai</span>
        <span className=''>các tuần</span>
      </div>
      <div className='w-full justify-center flex'>
        <button className='flex bg-unhoverBg hover:bg-hoveringBg rounded-lg items-center justify-center py-2 px-4'>
          Đăng ký
        </button>
      </div>
    </div>
  )
}
