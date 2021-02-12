import { useEffect, useState } from 'react'

declare class BarcodeDetector {
  static getSupportedFormats(): Promise<string[]>
}

export function useBrowserCompatibility() {
  const hasBarcodeDetector = 'BarcodeDetector' in window
  const [supportedQRCodeFormat, setSupportedQRCodeFormat] = useState(false)

  useEffect(() => {
    if (!hasBarcodeDetector) {
      return
    }
    BarcodeDetector.getSupportedFormats().then((formats) =>
      setSupportedQRCodeFormat(formats.includes('qr_code'))
    )
  }, [hasBarcodeDetector])

  return {
    hasBarcodeDetector,
    supportedQRCodeFormat,
  }
}
