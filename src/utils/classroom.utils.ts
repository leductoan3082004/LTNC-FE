export const generateClassroomId = ({ id }: { id: string }) => {
  return `id:${id}`
}

export function generateClassroomName(id: string) {
  const idLop = id.slice(id.length - 2)
  return 'L-' + idLop
}
