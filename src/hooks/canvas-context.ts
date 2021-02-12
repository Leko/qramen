import { useEffect, useRef, useState } from 'react'

export function useCanvasContext() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setContext] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    setContext(canvasRef.current.getContext('2d'))
  }, [canvasRef])

  return {
    canvasRef,
    ctx,
  }
}
