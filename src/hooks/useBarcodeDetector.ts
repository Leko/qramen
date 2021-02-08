export interface DetectedBarcode {
  boundingBox: DOMRectReadOnly
  cornerPoints: { x: number; y: number }[]
  format: string
  rawValue: string
}

export function useBarcodeDetector() {
  const hasCompatibility = 'BarcodeDetector' in window

  type FIXME_any = any
  function detect(source: FIXME_any): Promise<DetectedBarcode[]> {
    if (!hasCompatibility) {
      throw new Error("This environment doesn't support BarcodeDetector")
    }

    // @ts-expect-error BarcodeDetector is not defined yet
    const detector = new window.BarcodeDetector({ formats: ['qr_code'] })
    return detector?.detect(source)
  }

  return {
    hasCompatibility,
    detect,
  }
}
