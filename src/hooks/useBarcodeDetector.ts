import colorHash from 'material-color-hash'

export interface DetectedBarcode {
  boundingBox: DOMRectReadOnly
  cornerPoints: { x: number; y: number }[]
  format: string
  rawValue: string
  hashColor: string // CSS color
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
    return detector
      ?.detect(source)
      .then((results: Omit<DetectedBarcode, 'hashColor'>[]) =>
        results.map(
          (r: Omit<DetectedBarcode, 'hashColor'>): DetectedBarcode => ({
            ...r,
            hashColor: colorHash(r.rawValue, 300).backgroundColor,
          })
        )
      )
  }

  return {
    hasCompatibility,
    detect,
  }
}
