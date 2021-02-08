import React, { useEffect, useRef, useState } from 'react'
import { DetectedBarcode } from '../hooks/useBarcodeDetector'

interface Props {
  width: number
  height: number
  barcodes: DetectedBarcode[]
}

export function DetectionOverlay(props: Props) {
  const { barcodes } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [
    ctx,
    setCanvasRenderingContext2D,
  ] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    setCanvasRenderingContext2D(canvasRef.current.getContext('2d'))
  }, [canvasRef])
  useEffect(() => {
    if (!canvasRef.current || !ctx) {
      return
    }

    ctx.clearRect(0, 0, props.width, props.height)
    canvasRef.current.width = props.width
    canvasRef.current.height = props.height
    for (const barcode of barcodes) {
      const start = barcode.cornerPoints[0]
      ctx.beginPath()
      ctx.strokeStyle = barcode.hashColor
      ctx.lineWidth = 5
      ctx.moveTo(start.x, start.y)
      for (const p of barcode.cornerPoints.slice(1)) {
        ctx.lineTo(p.x, p.y)
      }
      ctx.closePath()
      ctx.stroke()
    }
  }, [barcodes, canvasRef, ctx])

  return <canvas ref={canvasRef} />
}
