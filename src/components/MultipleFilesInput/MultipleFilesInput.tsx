import React, { Fragment, useCallback } from 'react'
import config from 'src/constants/config'
import { useDropzone } from 'react-dropzone'

interface Props {
  handleChangeFiles?: (files: File[]) => void
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  buttonStyle?: string
}

const validFile = (file: File) => {
  if (file.size > config.maxSizeUploadAvatar) {
    return false
  }
  return true
}

//! HANDLE FILES

export default function MultipleFilesInput({ buttonStyle, setFiles }: Props) {
  const onDrop = useCallback(
    (fileList: File[]) => {
      // Do something with the files
      if (fileList) {
        for (let i = 0; i < fileList?.length; i++) {
          if (validFile(fileList[i])) {
            setFiles((prev) => [...prev, fileList[i]])
          }
        }
      }
    },
    [setFiles]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Fragment>
      <div {...getRootProps()} className={buttonStyle}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Thả tệp ở đây ...</p> : <p>Kéo / thả tệp vào đây, hoặc bấm để chọn</p>}
      </div>
    </Fragment>
  )
}
