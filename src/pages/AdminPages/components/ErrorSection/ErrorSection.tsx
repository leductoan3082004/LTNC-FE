export default function ErrorSection({ errorMessage }: { errorMessage?: string }) {
  return (
    <div className='grid grid-cols-4 gap-1 col-span-4'>
      <div className='col-start-2 col-end-5 mt-0.5 min-h-[1.25rem] text-sm text-alertRed'>{errorMessage}</div>
    </div>
  )
}
