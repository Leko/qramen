import { useEffect, useState } from 'react'

export function useUserMedia({
  width,
  height,
  enabled,
}: {
  width: number
  height: number
  enabled: boolean
}) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

    let _mediaStream: MediaStream
    navigator.mediaDevices
      .getUserMedia({
        video: {
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
  }, [enabled, width, height])

  return {
    mediaStream,
  }
}
