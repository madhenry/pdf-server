import { useEffect } from 'react'
import { useEditor } from 'src/components/EditorProvider'
import useSWR from 'swr'
import dynamic from 'next/dynamic'

const Previewer = dynamic(
  () => import('src/components/pdf/Previewer'),
  { ssr: false }
)

// const DownloadPreview = () => (
//   <iframe width="100%" height="100%" src={`/api/PDF?file=${file}&${encodeURI(vars.join('&'))}`} />
// )

const Preview = () => {
  const { file, texts, setTexts, template, setTemplate } = useEditor()
  const { data: templateFile } = useSWR(file ? `/api/template?file=${file}` : null, { dedupingInterval: 30000 })
  // const vars = Object.keys(texts).map(key => `${key}=${texts[key]}`)
  
  useEffect(() => {
    if (templateFile) {
      const defaultTexts = templateFile?.shortcuts?.texts?.filter(({ parentId }: { parentId: string }) => parentId !== '0:1').map(({ name, characters }: { name: string, characters: string }) => ({ name, characters })).reduce((all: Object, { name, characters }: { name: string, characters: string }) => ({ ...all, [name]: characters }), {})
      setTexts(defaultTexts)
      setTemplate(templateFile)
    }
  }, [templateFile])

  return template ? (
    <Previewer pages={template.shortcuts?.pages} data={texts} />
  ) : null
}

export default Preview
