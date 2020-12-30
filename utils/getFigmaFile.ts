import * as Figma from 'figma-js'
import { processFile } from 'figma-transformer'

const client = Figma.Client({
  personalAccessToken: process.env.FIGMA_TOKEN
})

export const ALLOWED_FILES = process.env.NEXT_PUBLIC_ALLOWED_FILES as string
export const allowedFiles = ALLOWED_FILES.length ? ALLOWED_FILES?.split(',') : []

export const getFigmaFile = async (fileId: string) => {
  if (allowedFiles.length && !allowedFiles.includes(fileId)) {
    throw new Error('This file id is not allowed by the server env ALLOWED_FILES')
  }
  const file = processFile(
    await client.file(fileId, {
      geometry: 'paths'
    }).then(({ data }) => data )
  )
  return file
}
