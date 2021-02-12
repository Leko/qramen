import { useEffect, useState } from 'react'

export enum ErrorReason {
  NotAllowedError = 'NotAllowedError',
  Unknown = 'Unknown',
}

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
  const [error, setError] = useState<ErrorReason | null>(null)

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
      .then(
        (mediaStream) => {
          _mediaStream = mediaStream
          setMediaStream(mediaStream)
        },
        (e) => {
          switch (e.name) {
            case 'NotAllowedError':
              setError(ErrorReason.NotAllowedError)
              return
            default:
              setError(ErrorReason.Unknown)
          }
        }
      )

    return () => {
      _mediaStream?.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }, [enabled, width, height])

  return {
    error,
    mediaStream,
  }
}
