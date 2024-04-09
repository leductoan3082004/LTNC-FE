import { useMutation } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import lessonApi from 'src/apis/lesson.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'
import mimeTypes from 'src/constants/mimeTypes'
import { LessonMaterial } from 'src/types/lesson.type'

interface Props {
  materials: LessonMaterial[]
}

export default function ClassroomMaterialListForLesson({ materials }: Props) {
  //! Declare states
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  //! Function to map file extensions to MIME types
  const getMimeType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase() || ''
    return mimeTypes[extension] || 'application/octet-stream' // Default to binary stream if unknown
  }

  //! Function to download file from string
  const downloadFileFromString = (fileContent: string, mimeType: string, filename: string = 'downloaded_file') => {
    try {
      // Create a Blob from the byte array
      const blob = new Blob([fileContent], { type: mimeType })

      // Create a URL for the blob
      const blobUrl = window.URL.createObjectURL(blob)

      // Create a temporary anchor element and trigger the download
      const link = document.createElement('a')
      link.href = blobUrl
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()

      // Clean up
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Error downloading the file:', error)
    }
  }

  //! Handle download material
  const getMaterialMutation = useMutation({ mutationFn: lessonApi.getMaterial })
  const downloadMaterial = (key: string, fileName: string) => () => {
    setExcutingDialog(true)
    setExcuting(true)

    getMaterialMutation.mutate(key, {
      onSettled: () => {
        setExcuting(false)
      },
      onSuccess: (response) => {
        // Assuming `response.data` is the file content
        const mimeType = getMimeType(key)
        downloadFileFromString(response.data, mimeType, fileName)
        setError(false)
      },
      onError: () => {
        setError(true)
      }
    })
  }

  return (
    <div className='space-y-2'>
      {materials.map((material) => (
        <button
          onClick={downloadMaterial(material.key, material.name)}
          key={material.key}
          className='py-2 w-full text-left desktop:text-lg border border-unhoverBg hover:border-hoveringBg px-4 bg-white text-primaryTextUnHover hover:text-primaryText font-medium rounded-lg'
        >
          {material.name}
        </button>
      ))}

      {/*//! EXCUTING FIELD */}
      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false)
        }}
      >
        <div className='w-full flex items-center justify-center'>
          {excuting && <LoadingRing />}
          {!excuting && (
            <Fragment>
              {!error && (
                <p className='text-center text-xl font-medium uppercase leading-6 text-successGreen'>
                  Tải về thành công
                </p>
              )}
              {error && (
                <p className='text-center text-xl font-medium uppercase leading-6 text-alertRed'>
                  Đã có lỗi xảy ra, vui lòng thử lại sau
                </p>
              )}
            </Fragment>
          )}
        </div>
      </DialogPopup>
    </div>
  )
}
