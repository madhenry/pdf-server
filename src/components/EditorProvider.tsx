import { FC, createContext, useContext, useState } from 'react'
import { ProcessedFile } from 'figma-transformer'
import { allowedFiles, DEFAULT_FILE } from 'utils/getFigmaFile'

export type EditorValues = {
  file?: string
  texts: { [key: string]: string }
  template?: ProcessedFile
  setFile: Function
  setTexts: Function
  setTemplate: Function
}

const Context = createContext<EditorValues>({
  file: '',
  texts: {},
  template: undefined,
  setFile: () => null,
  setTexts: () => null,
  setTemplate: () => null,
})

export const EditorProvider: FC<any> = ({ children }) => {
  const [fileId, setFileId] = useState(allowedFiles.length ? allowedFiles[0] : DEFAULT_FILE)
  const [texts, setTexts] = useState({})
  const [template, setTemplate] = useState<ProcessedFile>()
  return (
    <Context.Provider value={{
      file: fileId,
      texts,
      template,
      setFile: (fileId: string) => setFileId(fileId),
      setTexts: (texts: Object) => setTexts(texts),
      setTemplate: (template: ProcessedFile) => setTemplate(template),
    }}>
      {children}
    </Context.Provider>
  )
}

export const useEditor = () => useContext(Context)
