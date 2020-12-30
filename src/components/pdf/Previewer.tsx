import { PdfDocument } from 'src/components/PdfRenderer'
import { PDFViewer } from '@react-pdf/renderer'

const Previewer = ({ pages, data } : { pages: any, data: any }) => pages && data ? (
  <PDFViewer style={{ width: '100%', height: '100%' }}>
    <PdfDocument pages={pages} data={data} />
  </PDFViewer>
) : null

export default Previewer
