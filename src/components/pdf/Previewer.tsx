import { PdfDocument } from 'src/components/PdfRenderer'
import { PDFViewer } from '@react-pdf/renderer'

const Previewer = ({ pages, data, ...rest }) => pages && data ? (
  <PDFViewer {...rest}>
    <PdfDocument pages={pages} data={data} />
  </PDFViewer>
) : null

export default Previewer
