/* eslint-disable import/no-webpack-loader-syntax */
import * as comlink from 'comlink'
import { useEffect, useRef, useState } from 'react'
// @ts-expect-error worker-loader
import QRCodeWorker from 'worker-loader!../workers/qr-code'
import type { BarcodeSource } from '../workers/qr-code'

export interface DetectedBarcode {
  boundingBox: DOMRectReadOnly
  cornerPoints: { x: number; y: number }[]
  format: string
  rawValue: string
  hashColor: string // CSS color
}

const worker = comlink.wrap<{
  detectQRCodes(source: BarcodeSource): Promise<DetectedBarcode[]>
}>(new QRCodeWorker())

export function useBarcodeDetector({
  width,
  height,
  mediaStream,
}: {
  width: number
  height: number
  mediaStream: MediaStream | null
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [results, setResults] = useState<DetectedBarcode[]>([])

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl || !mediaStream) {
      return
    }

    let frameHandle: number
    function detectloop() {
      if (videoEl?.readyState !== 4) {
        frameHandle = requestAnimationFrame(detectloop)
        return
      }

      createImageBitmap(videoEl, {
        resizeWidth: width,
        resizeHeight: height,
        resizeQuality: 'low',
      })
        .then((bmp) => worker.detectQRCodes(comlink.transfer(bmp, [bmp])))
        .then(setResults)
        .finally(() => {
          frameHandle = requestAnimationFrame(detectloop)
        })
    }
    function onReady() {
      detectloop()
    }

    // Wait until the video is ready
    videoEl.addEventListener('playing', onReady, {
      once: true,
    })
    videoEl.srcObject = mediaStream

    return () => {
      cancelAnimationFrame(frameHandle)
      videoEl.removeEventListener('playing', onReady)
    }
  }, [videoRef, mediaStream, width, height])

  return {
    videoRef,
    results,
  }
}
