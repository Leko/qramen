import { useEffect, useState } from 'react'

export function useUserMedia({
  width,
  height,
}: {
  width: number
  height: number
}) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    let _mediaStream: MediaStream
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width,
          height,
          facingMode: 'environment',
        },
        audio: false,
      })
      .then((mediaStream) => {
        _mediaStream = mediaStream
        setMediaStream(mediaStream)
      })

    return () => {
      _mediaStream?.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }, [width, height])

  return {
    mediaStream,
  }
}
