import {faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MainFooter() {
  return (
    <div className='mt-10 border-none bg-blue-100'>
      <div className='pt-10 pb-10 container gap-5 flex text-darkText'>
        <div className='w-7/12 h-full'>
            <div className='pl-28 pb-10 text-3xl font-semibold'>Liên Hệ</div>
            <div className="flex items-center justify-center">
              <img className="w-4/6" src="https://i.ibb.co/DtMw32j/location.jpg" alt="" />
            </div>
          </div>
          <div className='pt-20 w-5/12 h-full inline-block '>
            <div className='flex'>
              <div className='items-center text-2xl px-4 rounded-full bg-darkText p-3 font-bold text-lightText'>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className='inline-block pl-4'>
                <div className='font-semibold text-xl text-darkText py-1'>Công tác - dịch vụ</div>
                <div className='text-darkText text-sm'>defuniversity@defuni.edu.vn</div>
              </div>
            </div>
            <div className='flex pt-12'>
              <div className='items-center text-2xl px-4 rounded-full bg-darkText p-3 font-bold text-lightText'>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className='inline-block pl-4'>
                <div className='font-semibold text-xl py-1'>Quản lý sinh viên</div>
                <div className='text-darkText'>quanlysinhvien@defuni.edu.vn</div>
              </div>
            </div>
            <div className='flex pt-12'>
              <div className='items-center text-2xl px-4 rounded-full bg-darkText p-3 font-bold text-lightText'>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className='inline-block pl-4'>
                <div className='font-semibold text-xl py-1'>Số điện thoại dịch vụ</div>
                <div className='text-darkText'>0868712144</div>
              </div>
            </div>



            <div className='py-10 text-darkText'>
              <div className='font-bold'>WORKING HOURS</div>
              <div>
                <div>Thứ hai - Thứ 6: 08:00 -19:30</div>
                <div>Thứ bảy: 10:00 - 16:30</div>
                <div>Chủ nhật: 10:00 - 16:30</div>
              </div>
            </div>
          </div>
      </div>

      <div className='bg-mainBg border-t-[0.1px] border-y-black shrink-0 flex flex-col justify-between'>
        <div className='text-xs w-full text-center bg-slate-700 p-2 text-gray-400'>Copyright 2024 © LTNC</div>
      </div>
    </div>
  )
}
