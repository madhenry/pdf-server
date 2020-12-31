import { useMemo } from 'react'
import { PdfDocument } from 'src/components/PdfRenderer'
import { PDFViewer } from '@react-pdf/renderer'

const Previewer = ({ pages, data } : { pages: any, data: any }) => {
  if (!pages || !data) return null
  return useMemo(
    () => (
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <PdfDocument pages={pages} data={data} />
      </PDFViewer>
    ), [data, pages]
  )
}

export default Previewer
