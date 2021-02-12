import { useEffect } from 'react'
import { useBrowserCompatibility } from '../hooks/browser-compatibility'
import {
  DetectedBarcode,
  useBarcodeDetector,
} from '../hooks/useBarcodeDetector'
import { ErrorReason, useUserMedia } from '../hooks/userMedia'
import { useWindowFocus } from '../hooks/window'
import './QRCodeScanner.css'

interface Props {
  width: number
  height: number
  onResult: (results: DetectedBarcode[]) => unknown
  onError: (error: Error) => unknown
}

export function QRCodeScanner(props: Props) {
  const { width, height, onResult, onError } = props
  const { active } = useWindowFocus()
  const {
    hasBarcodeDetector,
    supportedQRCodeFormat,
  } = useBrowserCompatibility()
  const { mediaStream, error } = useUserMedia({
    width,
    height,
    enabled: active,
  })
  const { videoRef, results } = useBarcodeDetector({
    mediaStream,
    width,
    height,
  })

  useEffect(() => {
    onResult(results)
  }, [onResult, results])
  useEffect(() => {
    if (!error) {
      return
    }
    onError(new Error(error))
  }, [onError, error])

  if (!hasBarcodeDetector || !supportedQRCodeFormat) {
    return (
      <div>
        Your browser doesn't support BarcodeDetector and QR code detection
      </div>
    )
  }
  if (error) {
    let howToFix = <p>An unexpected error occured. Please try again.</p>
    if (error === ErrorReason.NotAllowedError) {
      howToFix = (
        <>
          <p>Please allow to access camera and try again.</p>
          <p>
            <a href="https://support.google.com/chrome/answer/2693767?co=GENIE.Platform%3DAndroid&hl=en&oco=1">
              Get help with camera
            </a>
          </p>
        </>
      )
    }

    return (
      <div className="qr-code-scanner-error">
        {/* @ts-ignore */}
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_n0YWqQ.json"
          background="transparent"
          speed="1"
          style={{ width: '100%', height: 180 }}
          autoplay
        />
        <h2>Camera is not available</h2>
        <p>Please allow to access camera and try again.</p>
        {howToFix}
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
