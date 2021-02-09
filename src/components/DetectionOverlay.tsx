import { useEffect, useRef, useState } from 'react'
import type { DetectedBarcode } from '../hooks/useBarcodeDetector'

interface Props {
  width: number
  height: number
  barcodes: DetectedBarcode[]
}

export function DetectionOverlay(props: Props) {
  const { barcodes, width, height } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setContext] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    setContext(canvasRef.current.getContext('2d'))
  }, [canvasRef])
  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    canvasRef.current.width = width
    canvasRef.current.height = height
  }, [width, height])
  useEffect(() => {
    if (!ctx) {
      return
    }

    ctx.clearRect(0, 0, width, height)
    for (const barcode of barcodes) {
      const start = barcode.cornerPoints[0]
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      for (const p of barcode.cornerPoints.slice(1)) {
        ctx.lineTo(p.x, p.y)
      }
      ctx.closePath()
      ctx.strokeStyle = barcode.hashColor
      ctx.lineWidth = 5
      ctx.stroke()
    }
  }, [barcodes, ctx, height, width])

  return <canvas ref={canvasRef} style={{ width: width, height: height }} />
}
