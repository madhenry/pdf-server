import { FC } from 'react'
import { Page, Text, StyleSheet } from '@react-pdf/renderer'
import { getTextStyles, getColor, chooseText } from './helpers'
import { Vector } from './Vector'
import Figma from 'figma-js'
import { NodeWithShortcuts } from 'figma-transformer'

type Props = {
  data?: any
  frame: NodeWithShortcuts<Figma.Frame>
}

export const PdfPage: FC<Props> = ({ frame, data }) => {
  const { width, height, x, y } = frame.absoluteBoundingBox
  const vectors = frame.shortcuts?.vectors as NodeWithShortcuts<Figma.Vector>[] || []
  const texts = frame.shortcuts?.texts as NodeWithShortcuts<Figma.Text>[] || []
  return (
    <Page
      debug={data.debug}
      size={{ width, height }}
      style={StyleSheet.create({
        page: {
          backgroundColor: getColor(frame.backgroundColor)
        }
      }).page}
    >
      {vectors.map((vector, i) => (
        <Vector key={i} vector={vector} debug={data.debug} />
      ))}
      {texts.map((node, i) => (
        <Text key={i} style={getTextStyles(node, { x, y })} debug={data.debug}>
          {chooseText(node, data)}
        </Text>
      ))}
    </Page>
  )
}
