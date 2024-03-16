import React, { useContext } from 'react'
import { CourseContext } from 'src/contexts/course.context'

export default function CourseDescription() {
  const { academicYear } = useContext(CourseContext)

  return (
    <div className='space-y-8 h-[2000px]'>
      <p className='font-bold uppercase text-xl desktop:text-3xl text-primaryText w-full text-center tracking-widest'>
        Lập trình nâng cao
      </p>
      <div className='space-y-4 text-lg'>
        <div className='flex space-x-2'>
          <span className='opacity-60'>Năm học:</span>
          <span className='text-primaryText'>{academicYear}</span>
        </div>
        <p className=''>
          Trước tiên sinh viên sẽ được giới thiệu về mục tiêu của môn học, quan hệ của nó với các môn học khác trong
          chương trình đào tạo. Sau đó, sinh viên sẽ được học các kỹ thuật lập trình nâng cao sử dụng ngôn ngữ lập trình
          bậc cao C++ để giải quyết các bài toán cụ thể trên máy t nh, đồng thời sinh viên cũng học phong cách lập trình
          chuyên nghiệp, lập trình nhóm, kiểm thử và gỡ r i chương trình. Lý thuyết chung về Lập trình nâng cao bao gồm
          các khái niệm cơ bản và kỹ thuật lập trình nâng cao được thể hiện trong C++, các kiểu cấu trúc dữ liệu thông
          dụng như mảng, cấu trúc, lớp, hàm, con trỏ, danh sách liên kết và cách thức lập trình nhóm. Sinh viên cũng
          được hướng dẫn thực hành để có thể lập trình nhóm và xây dựng, gỡ r i và kiểm thử chương trình dựa trên ngôn
          ngữ bậc cao C++.
        </p>
      </div>
    </div>
  )
}
