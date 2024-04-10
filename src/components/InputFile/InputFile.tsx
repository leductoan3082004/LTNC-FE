import React, { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChangeFile?: (file: File) => void
  className?: string
}

export default function InputFile({
  onChangeFile,
  className = 'absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/60 dark:bg-black/60'
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadFile = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal) {
      if (fileFromLocal.size > config.maxSizeUploadAvatar) {
        toast.error('Kích thước tệp quá lớn')
      } else {
        onChangeFile && onChangeFile(fileFromLocal)
      }
    }
  }

  return (
    <Fragment>
      <input
        type='file'
        className='hidden'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => ((event.target as HTMLInputElement).value = '')}
      />
      <button className={className} onClick={handleUploadFile} type='button'>
        Chọn tài liệu
      </button>
    </Fragment>
  )
}
