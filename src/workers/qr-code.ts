import * as Comlink from 'comlink'
import colorHash from 'material-color-hash'

interface DetectedBarcode {
  boundingBox: DOMRectReadOnly
  cornerPoints: { x: number; y: number }[]
  format: string
  rawValue: string
}
interface ScanResult extends DetectedBarcode {
  hashColor: string // CSS color
}

export type BarcodeSource =
  | HTMLImageElement
  | SVGImageElement
  | HTMLVideoElement
  | HTMLCanvasElement
  | Blob
  | ImageData
  | ImageBitmap
  | OffscreenCanvas

declare class BarcodeDetector {
  detect(source: BarcodeSource): Promise<DetectedBarcode[]>
}

// eslint-disable-next-line
const hasBarcodeDetector = 'BarcodeDetector' in self
let detector: BarcodeDetector

export function detectQRCodes(source: BarcodeSource): Promise<ScanResult[]> {
  if (!hasBarcodeDetector) {
    throw new Error("This browser doesn't support BarcodeDetector")
  }
  if (!detector) {
    detector = new BarcodeDetector()
  }

  return detector
    .detect(source)
    .then((results: Omit<DetectedBarcode, 'hashColor'>[]) =>
      results.map(
        (r: Omit<DetectedBarcode, 'hashColor'>): ScanResult => ({
          ...r,
          hashColor: colorHash(r.rawValue, 300).backgroundColor,
        })
      )
    )
}

Comlink.expose({ detectQRCodes })
