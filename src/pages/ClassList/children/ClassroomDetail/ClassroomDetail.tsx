import { useState } from "react";
import ClassSection from "./commponents/ClassSection";
export default function ClassroomDetail() {
  const _section = [
    {
      name: 'Đề cương môn học',
    },
    {
      name: 'Video'
    },
    {
      name: 'Quiz'
    },
    {
      name: 'Slide bài giảng'
    }
  ]
  
  return (
    <div className='bg-mainBg min-h-[100vh] py-4'>
      <div className='container flex flex-col bg-webColor100 py-6 min-h-[100vh]'>
        <div className='flex flex-col gap-2 pb-3 border-b title'>
          <h1 className='text-2xl font-semibold'>Vật Lý</h1>
        </div>
        {_section.map((_section, index) => (
          <button key={index} className='flex flex-col px-1 video gap-y-2'>
            <h4 className='text-lg font-normal title'>
              {' '}
              <ClassSection class_section={_section.name} index={index} />
            </h4>
          </button>
        ))}
      </div>
    </div>
  )
}
