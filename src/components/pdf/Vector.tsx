import { FC } from 'react'
import { StyleSheet, Canvas } from '@react-pdf/renderer'
import { Vector as VectorType } from 'figma-js'
import { getColor } from './helpers'

export const Vector: FC<{ vector: VectorType, debug: any }> = ({ vector, debug }) => {
  const { x, y, width, height } = vector.absoluteBoundingBox
  const padding = vector.strokeWeight
  return (
    <Canvas
      style={
        StyleSheet.create({
          svg: {
            position: 'absolute',
            left: x - padding,
            top: y - padding,
            width: width + padding * 2,
            height: height + padding * 2,
          },
        }).svg
      }
      debug={debug}
      paint={painter => {
        vector?.fillGeometry?.map(({ path }) =>
          painter
            .translate(padding, padding)
            .path(path)
            .fillColor(getColor(vector.fills[0].color))
            .fillOpacity(vector.fills[0].color?.a)
            .fill()
        )
        vector?.strokeGeometry?.map(({ path }) =>
          painter
            .translate(padding, padding)
            .lineJoin('miter')
            .path(path)
            .lineWidth(vector.strokeWeight / 2)
            .strokeColor(getColor(vector.strokes[0].color))
            .fill(getColor(vector.strokes[0].color))
            .fillOpacity(vector.strokes[0].color?.a)
            .stroke()
        )
        return null
      }}
    />
  )
}
