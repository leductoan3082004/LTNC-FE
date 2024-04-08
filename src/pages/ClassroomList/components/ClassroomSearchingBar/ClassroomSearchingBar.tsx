export default function ClassroomSearchingBar() {
  return (
    <div className='w-full'>
      <form
        className='relative flex items-center w-full duration-200 rounded-lg shadow-sm bg-sidebarItemLight dark:bg-sidebarItemDark'
        // onSubmit={handleSearch}
      >
        <input
          className='w-full px-4 py-1 text-base duration-200 bg-transparent rounded-md outline-none focus:ring-gray-300 desktop:py-1 desktop:text-lg text-darkText caret-black ring-2 ring-primaryTextUnHover '
          placeholder='Tìm kiếm'
          // {...register('name')}
        />
        <button className='absolute flex items-center justify-center px-2 py-2 text-white duration-200 rounded-lg desktop:right-4 desktop:px-3 right-1 bg-primaryTextUnHover hover:bg-primaryText '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-4 h-4 lg:h-5 lg:w-5'
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
