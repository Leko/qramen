import { useEffect } from 'react'
import { useCanvasContext } from '../hooks/canvas-context'
import type { DetectedBarcode } from '../hooks/useBarcodeDetector'

interface Props {
  width: number
  height: number
  barcodes: DetectedBarcode[]
}

function getCornerCoordinates(
  width: number,
  height: number
): [number, number, number, number, number, number][] {
  const size = Math.min(width, height) - 160
  const cornerSize = size / 8
  const guideX = width / 2 - size / 2
  const guideY = height / 2 - size / 2
  return [
    [guideX, guideY + cornerSize, guideX, guideY, guideX + cornerSize, guideY],
    [
      guideX + size - cornerSize,
      guideY,
      guideX + size,
      guideY,
      guideX + size,
      guideY + cornerSize,
    ],
    [
      guideX + size,
      guideY + size - cornerSize,
      guideX + size,
      guideY + size,
      guideX + size - cornerSize,
      guideY + size,
    ],
    [
      guideX + cornerSize,
      guideY + size,
      guideX,
      guideY + size,
      guideX,
      guideY + size - cornerSize,
    ],
  ]
}

export function DetectionOverlay(props: Props) {
  const { barcodes, width, height } = props
  const { ctx, canvasRef } = useCanvasContext()

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    canvasRef.current.width = width
    canvasRef.current.height = height
  }, [canvasRef, width, height])

  useEffect(() => {
    if (!ctx) {
      return
    }

    requestAnimationFrame(() => {
      ctx.clearRect(0, 0, width, height)
      for (const [sx, sy, cpx, cpy, x, y] of getCornerCoordinates(
        width,
        height
      )) {
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.quadraticCurveTo(cpx, cpy, x, y)
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 2
        ctx.stroke()
      }
      for (const barcode of barcodes) {
        const start = barcode.cornerPoints[0]
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        for (const p of barcode.cornerPoints.slice(1)) {
          ctx.lineTo(p.x, p.y)
        }
        ctx.closePath()
        ctx.strokeStyle = barcode.hashColor
        ctx.lineWidth = 4
        ctx.stroke()
      }
    })
  }, [barcodes, ctx, height, width])

  return <canvas ref={canvasRef} width={width} height={height} />
}
