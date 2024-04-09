export const generateClassroomId = ({ id }: { id: string }) => {
  return `id:${id}`
}

export function generateClassroomName(id: string) {
  const idLop = id.slice(id.length - 2)
  return 'L-' + idLop
}

export function getClassroomIdFromUrl(url: string) {
  const arr = url.split('id:')
  const stringAfterId = arr[arr.length - 1]
  return stringAfterId.split('/')[0]
}
