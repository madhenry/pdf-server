import * as Figma from 'figma-js'
import { processFile } from 'figma-transformer'

const client = Figma.Client({
  personalAccessToken: process.env.FIGMA_TOKEN
})

export const DEFAULT_FILE = process.env.DEFAULT_FILE || `w4qFtzyCX2fYT3x6CQDFQF`
export const MAX_VECTORS = process.env.MAX_VECTORS || 100
export const ALLOWED_FILES = process.env.NEXT_PUBLIC_ALLOWED_FILES as string
export const allowedFiles = ALLOWED_FILES.length ? ALLOWED_FILES?.split(',') : []

type FigmaOptions = {
  geometry?: 'paths' | ''
}

export const getFigmaFile = async (fileId: string, options?: FigmaOptions) => {
  if (allowedFiles.length && !allowedFiles.includes(fileId)) {
    throw new Error('This file id is not allowed by the server env ALLOWED_FILES')
  }
  const figmaFile = await client.file(fileId, options ?? {
    geometry: 'paths'
  }).then(({ data }) => data )
  console.log('figma children: ', figmaFile.document.children.length)
  const file = processFile(figmaFile)
  console.log('figma processed vectors length: ', file.shortcuts.vectors?.length)
  if (file.shortcuts.vectors && file.shortcuts.vectors.length > MAX_VECTORS) {
    throw new Error('Too many vectors in template')
  }
  return file
}
