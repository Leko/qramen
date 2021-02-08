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

export function QRCodeScanner(props: Props) {
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
        function detectloop() {
          detect(videoRef.current)
            .then(onResult)
            .finally(() => {
              requestAnimationFrame(detectloop)
            })
        }

        videoRef.current!.srcObject = mediaStream
        // Wait until the video is ready
        videoRef.current?.addEventListener('playing', detectloop)
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
      <video
        ref={videoRef}
        style={{ width: props.width, height: props.height }}
        playsInline
        autoPlay
      />
    </div>
  )
}
