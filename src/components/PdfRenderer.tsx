import ReactPDF, { Document } from '@react-pdf/renderer'
import { PdfPage } from 'src/components/pdf/PdfPage'
import { getFigmaFile } from 'utils/getFigmaFile'
import Figma from 'figma-js'
import { NodeWithShortcuts } from 'figma-transformer'

export type PdfDocumentProps = {
  pages: NodeWithShortcuts<Figma.Canvas>[]
  data: any
}

export const PdfDocument = ({ pages, data }: PdfDocumentProps) => (
  <Document>
    {pages.map((page, i) => (
      page.shortcuts?.frames.filter(({ layoutMode }) => layoutMode !== 'VERTICAL' && layoutMode !== 'HORIZONTAL').map((frame, ii) => (
        <PdfPage key={`page-${i}-frame-${ii}`} frame={frame} data={data} />
      ))
    ))}
  </Document>
)

export async function streamPDF({ data }: any) {
  if (!data.file) {
    throw new Error('Must provide figma file id')
  }
  const file = await getFigmaFile(data.file)
  const { pages } = file.shortcuts
  return ReactPDF.renderToStream(
    <PdfDocument pages={pages} data={data} />
  )
}
