import React from 'react'

export default function CourseSearchingBar() {
  return (
    <div className='w-full'>
      <form
        className='relative flex w-full items-center rounded-lg bg-sidebarItemLight shadow-sm duration-200 dark:bg-sidebarItemDark'
        // onSubmit={handleSearch}
      >
        <input
          className='focus:ring-primaryText desktop:py-2 desktop:text-lg w-full rounded-md bg-transparent px-4 py-1 text-base text-darkText caret-black ring-2 outline-none ring-primaryTextUnHover duration-200 '
          placeholder='Tìm kiếm khóa học'
          // {...register('name')}
        />
        <button className='desktop:right-4 desktop:px-3 text-white absolute right-1 flex items-center justify-center rounded-lg bg-primaryTextUnHover px-2 py-2 duration-200 hover:bg-primaryText '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='lg:h-5 lg:w-5 h-4 w-4'
          >
            <path
              fillRule='evenodd'
              d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </form>
    </div>
  )
}
