import AdminCourseListByYear from '../AdminCourseListByYear'

export default function AdminCourseManagement() {
  return (
    <div>
      <p className='w-full text-center font-semibold desktop:text-xl uppercase text-primaryText'>Danh sách khóa học</p>

      <div className='py-4 px-20 w-full'>
        <div className='border-t border-white'></div>
      </div>

      <AdminCourseListByYear year={2023} />

      <div className='py-4 tablet:px-20 desktop:px-32 w-full'>
        <div className='border-t border-white'></div>
      </div>

      <AdminCourseListByYear year={2024} />

      <div className='py-4 tablet:px-20 desktop:px-32 w-full'>
        <div className='border-t border-white'></div>
      </div>

      <AdminCourseListByYear year={2025} />

      <div className='py-4 tablet:px-20 desktop:px-32 w-full'>
        <div className='border-t border-white'></div>
      </div>

      <AdminCourseListByYear year={2026} />
    </div>
  )
}
