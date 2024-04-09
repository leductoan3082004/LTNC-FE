import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import lessonApi from 'src/apis/lesson.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingSection from 'src/components/LoadingSection'
import MultipleFilesInput from 'src/components/MultipleFilesInput'

interface Props {
  lessonId: string
}

export default function ClassroomUploadMaterialForLesson({ lessonId }: Props) {
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  //! Handle file
  const [files, setFiles] = useState<File[]>([])
  const handleChangeFiles = (files: File[]) => {
    setFiles(files)
  }

  const removeFile = (fileIndex: number) => () => {
    setFiles(files.filter((_, index) => index != fileIndex))
  }

  //! Upload file
  const queryClient = useQueryClient()
  const uploadMaterialMutation = useMutation({
    mutationFn: lessonApi.uploadMaterial
  })
  const handleSubmit = () => {
    setExcutingDialog(true)
    setExcuting(true)

    try {
      for (let i = 0; i < files.length; i++) {
        const body = {
          lessonId: lessonId,
          file: files[i]
        }
        uploadMaterialMutation.mutate(body, {
          onError: (error) => {
            setExcuting(false)
            setSuccess(false)
            setError(true)
            console.log(error)
            return
          }
        })
      }
    } catch (error) {
      setExcuting(false)
      setSuccess(false)
      setError(true)
      console.warn(error)
      return
    }

    queryClient.invalidateQueries({ queryKey: ['lesson_list'] })
    setFiles([])
    setExcuting(false)
    setError(false)
    setSuccess(true)
  }

  //! Style
  const buttonStyle =
    'flex items-center border-black/40 border justify-center h-20 px-4 hover:bg-black/10 rounded-lg cursor-pointer'

  return (
    <div className='p-4 space-y-4'>
      <p className='text-lg desktop:text-xl font-semibold  uppercase text-center'>Thêm tài liệu</p>

      <div className='flex flex-col items-end space-y-2 px-4 tablet:px-10 desktop:px-20'>
        <div className='space-y-2 w-full bg-white rounded-lg p-2'>
          {files.length > 0 && (
            <div className='flex flex-col'>
              {files.map((file, index) => (
                <div
                  key={index}
                  className='p-2 border-t first:border-none border-black/20 flex justify-between bg-white items-center'
                >
                  <span className='font-medium'>{file.name}</span>
                  <button
                    onClick={removeFile(index)}
                    className='hover:text-alertRed tetx-sm p-1 rounded-md border border-black/20'
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <MultipleFilesInput handleChangeFiles={handleChangeFiles} buttonStyle={buttonStyle} setFiles={setFiles} />
        </div>

        <button
          disabled={files.length == 0}
          onClick={handleSubmit}
          className='flex items-center justify-center py-1 px-4  bg-unhoverBg hover:bg-hoveringBg rounded-md disabled:hover:bg-unhoverBg disabled:opacity-50'
        >
          Tải lên
        </button>
      </div>

      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false)
        }}
      >
        {excuting && <LoadingSection />}
        {!excuting && (
          <Fragment>
            {success && (
              <p className='text-center text-xl font-medium uppercase leading-6 text-successGreen'>
                Upload tài liệu thành công
              </p>
            )}

            {error && (
              <p className='text-center text-xl font-medium uppercase leading-6 text-alertRed'>
                Đã có lỗi xảy ra, vui lòng thử lại
              </p>
            )}
          </Fragment>
        )}
      </DialogPopup>
    </div>
  )
}
