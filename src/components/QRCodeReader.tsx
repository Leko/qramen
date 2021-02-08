import React, { useEffect, useRef } from 'react'
import {
  DetectedBarcode,
  useBarcodeDetector,
} from '../hooks/useBarcodeDetector'

function useUserMedia({ width, height }: { width: number; height: number }) {
  function getBackCameraStream() {
    return navigator.mediaDevices.getUserMedia({
      video: {
        width,
        height,
        aspectRatio: width / height,
        facingMode: 'environment',
      },
      audio: false,
    })
  }

  return {
    getBackCameraStream,
  }
}

interface Props {
  width: number
  height: number
  onResult: (results: DetectedBarcode[]) => unknown
}

export function QRCodeReader(props: Props) {
  const { onResult } = props
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const { hasCompatibility, detect } = useBarcodeDetector()
  const { getBackCameraStream } = useUserMedia(props)

  useEffect(
    () => {
      if (!hasCompatibility || !videoRef.current) {
        return
      }
      getBackCameraStream().then((mediaStream) => {
        const track = mediaStream.getVideoTracks()[0]
        // @ts-expect-error ImageCapture is not defined yet
        const captureTrack = new ImageCapture(track)
        videoRef.current!.srcObject = mediaStream

        function detectloop() {
          captureTrack
            .grabFrame()
            .then(async (imgBitMap: ImageBitmap) => {
              const results = await detect(imgBitMap)
              onResult(results)
            })
            .finally(() => {
              requestAnimationFrame(detectloop)
            })
        }
        detectloop()
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasCompatibility, videoRef]
  )

  if (!hasCompatibility) {
    return (
      <div>
        <h3>Your browser doesn't support BarcodeDetector</h3>
        <p>TODO: More description</p>
      </div>
    )
  }

  return (
    <div>
      <video ref={videoRef} playsInline autoPlay />
    </div>
  )
}
