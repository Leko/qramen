import { useEffect, useRef } from 'react'
import {
  DetectedBarcode,
  useBarcodeDetector,
} from '../hooks/useBarcodeDetector'
import { useUserMedia } from '../hooks/userMedia'

interface Props {
  width: number
  height: number
  onResult: (results: DetectedBarcode[]) => unknown
}

export function QRCodeScanner(props: Props) {
  const { onResult } = props
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const { hasCompatibility, detect } = useBarcodeDetector()
  const { mediaStream } = useUserMedia(props)

  useEffect(
    () => {
      let frameHandle: number
      const videoEl = videoRef.current
      if (!mediaStream || !hasCompatibility || !videoEl) {
        return
      }
      function detectloop() {
        if (videoEl?.readyState !== 4) {
          frameHandle = requestAnimationFrame(detectloop)
          return
        }
        detect(videoEl)
          .then(onResult)
          .finally(() => {
            frameHandle = requestAnimationFrame(detectloop)
          })
      }

      // Wait until the video is ready
      videoEl.addEventListener('playing', detectloop)
      videoEl.srcObject = mediaStream

      return () => {
        cancelAnimationFrame(frameHandle)
        videoEl.removeEventListener('playing', detectloop)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasCompatibility, videoRef, mediaStream]
  )

  if (!hasCompatibility) {
    return <div>Your browser doesn't support BarcodeDetector</div>
  }

  return (
    <video
      ref={videoRef}
      style={{ width: props.width, height: props.height }}
      playsInline
      autoPlay
    />
  )
}
