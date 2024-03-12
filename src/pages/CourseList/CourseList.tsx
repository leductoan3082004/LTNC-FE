import CourseSortingtByYear from './components/CourseSortingtByYear'

export default function CourseList() {
  return (
    <div className='space-y-8'>
      <CourseSortingtByYear year={2024} />
      <CourseSortingtByYear year={2025} />
      <CourseSortingtByYear year={2026} />
      <CourseSortingtByYear year={2027} />
    </div>
  )
}
