import {faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MainFooter() {
  return (
    <div>

      <div className='container gap-5 flex'>
          <div className='w-1/2 h-full'>
            <div className='text-3xl text-darkText font-semibold'>Liên Hệ</div>
            <img src='' alt=''></img>
          </div>
          <div className='w-1/2 h-full inline-block'>
            <div className='flex'>
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className='inline-block'>
                <div className=''>Công tác - dịch vụ</div>
                <div className=''>defuniversity@defuni.edu.vn</div>
              </div>
            </div>
            <div className='flex'>
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className='inline-block'>
                <div className=''>Công tác - dịch vụ</div>
                <div className=''>defuniversity@defuni.edu.vn</div>
              </div>
            </div>
            <div className='flex'>
              <div>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className='inline-block'>
                <div className=''>Công tác - dịch vụ</div>
                <div className=''>defuniversity@defuni.edu.vn</div>
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
