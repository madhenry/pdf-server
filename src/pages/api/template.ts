import { NextApiRequest, NextApiResponse } from 'next'
import analytics from 'utils/analytics'
import { getFigmaFile } from 'utils/getFigmaFile'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET' || !req.query.file.length) throw new Error('Must provide Figma file id')
    const file = await getFigmaFile(req.query.file as string)
    const onlyFields = req.query.onlyFields ?? false
    const textFields = file?.shortcuts?.texts.filter(({ parentId }: any) => parentId !== '0:1').map(({ name, characters }) => ({ name, characters }))
    res.status(200).json(onlyFields ? textFields : file)
    analytics.track({
      event: 'Figma Fields Query',
      properties: {
        file: req.query.file as string
      }
    })
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: e.message })
    analytics.track({
      event: 'Figma Fields Query error',
      properties: {
        error: String(e)
      }
    })
  }
}
