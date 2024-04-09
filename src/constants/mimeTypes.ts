interface MimeTypes {
  [key: string]: string
}

const mimeTypes: MimeTypes = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  txt: 'text/plain',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  // Add more mappings as needed
}

export default mimeTypes
