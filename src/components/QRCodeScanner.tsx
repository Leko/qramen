import { useEffect } from 'react'
import { useBrowserCompatibility } from '../hooks/browser-compatibility'
import {
  DetectedBarcode,
  useBarcodeDetector,
} from '../hooks/useBarcodeDetector'
import { useUserMedia } from '../hooks/userMedia'
import { useWindowFocus } from '../hooks/window'
import './QRCodeScanner.css'

interface Props {
  width: number
  height: number
  onResult: (results: DetectedBarcode[]) => unknown
}

export function QRCodeScanner(props: Props) {
  const { width, height, onResult } = props
  const { active } = useWindowFocus()
  const {
    hasBarcodeDetector,
    supportedQRCodeFormat,
  } = useBrowserCompatibility()
  const { mediaStream } = useUserMedia({ width, height, enabled: active })
  const { videoRef, results } = useBarcodeDetector({
    mediaStream,
    width,
    height,
  })

  useEffect(() => {
    onResult(results)
  }, [onResult, results])

  if (!hasBarcodeDetector || !supportedQRCodeFormat) {
    return (
      <div>
        Your browser doesn't support BarcodeDetector and QR code detection
      </div>
    )
  }

  return (
    <video
      playsInline
      autoPlay
      className="qr-code-scanner-video"
      ref={videoRef}
    />
  )
}
