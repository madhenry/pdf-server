import { StyleSheet } from '@react-pdf/renderer'
import Figma from 'figma-js'
import { NodeWithShortcuts } from 'figma-transformer'
import Color from 'color'

export const getAlignment = (string: string) => {
  switch (string) {
    case 'RIGHT':
      return 'right'
    case 'LEFT':
      return 'left'
    case 'CENTER':
      return 'center'
    default:
      return 'left'
  }
}

export const getLayoutAlignment = (node: Figma.Frame | Figma.Group): any => {
  switch (node.layoutAlign) {
    case 'MAX':
      return { alignSelf: 'flex-end' }
    case 'MIN':
      return { alignSelf: 'flex-start' }
    case 'CENTER':
      return { alignSelf: 'center' }
  }
}

export const getColor = ({ r, g, b } = { r: 0, g: 0, b: 0 }) => Color({ r: r * 255, g: g * 255, b: b * 255 }).hex() as string

export const chooseText = (node: NodeWithShortcuts<Figma.Text>, data: Object) => {
  const { name, characters } = node
  let text
  for (const [key, value] of Object.entries(data)) {
    if (name === key) return value
    text = characters
  }
  return text
}

export const getTextStyles = ({
    style,
    fills,
    opacity,
    absoluteBoundingBox,
  }: Figma.Text,
  { x, y }: any
) => {
  return StyleSheet.create({
    style: {
      position: 'absolute',
      top: absoluteBoundingBox.y - y,
      left: absoluteBoundingBox.x - x,
      width: absoluteBoundingBox.width,
      color: getColor(fills[0].color),
      opacity: opacity,
      textAlign: getAlignment(style.textAlignHorizontal),
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      // fontFamily: style.fontFamily,
      letterSpacing: style.letterSpacing,
    },
  }).style as any
}
