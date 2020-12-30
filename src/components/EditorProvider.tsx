import { FC, createContext, useContext, useState } from 'react'
import Figma from 'figma-js'
import { NodeWithShortcuts } from 'figma-transformer'

type EditorValues = {
  file: string
  texts: Object
  template: NodeWithShortcuts<Figma.Canvas>
  setFile: Function
  setTexts: Function
  setTemplate: Function
}

const Context = createContext<EditorValues>({
  file: '',
  texts: {},
  template: {} as NodeWithShortcuts<Figma.Canvas>,
  setFile: () => null,
  setTexts: () => null,
  setTemplate: () => null,
})

export const EditorProvider: FC<any> = ({ children }) => {
  const [fileId, setFileId] = useState(`w4qFtzyCX2fYT3x6CQDFQF`)
  const [texts, setTexts] = useState({})
  const [template, setTemplate] = useState({} as NodeWithShortcuts<Figma.Canvas>)
  return (
    <Context.Provider value={{
      file: fileId,
      texts,
      template,
      setFile: (fileId: string) => setFileId(fileId),
      setTexts: (texts: Object) => setTexts(texts),
      setTemplate: (template: NodeWithShortcuts<Figma.Canvas>) => setTemplate(template),
    }}>
      {children}
    </Context.Provider>
  )
}

export const useEditor = () => useContext(Context)
