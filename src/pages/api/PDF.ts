import { NextApiRequest, NextApiResponse } from 'next'
import { streamPDF } from 'src/components/PdfRenderer'
import analytics from 'utils/analytics'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = parseData(req)
    const stream = await streamPDF({ data })
    if (data.fileName) {
      const fileName = data.fileName.substring(data.fileName.lastIndexOf("/") + 1)
      res.setHeader("content-disposition", "attachment; filename=" + fileName)
    }
    res.setHeader('Content-Type', 'application/pdf')
    res.status(200).send(stream)
    analytics.track({
      event: 'PDF stream',
      properties: {
        ...data
      }
    })
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: e.message })
    analytics.track({
      event: 'PDF stream error',
      properties: {
        error: String(e)
      }
    })
  }
}

const parseData = (req: NextApiRequest) => {
  if (req.method === 'GET') {
    return req.query
  } else if (req.method === 'POST') {
    return req.body
  } else {
    throw new Error('Error parsing data')
  }
}
