import type { DetectedBarcode } from '../hooks/useBarcodeDetector'
import './ExactMatchToast.css'

interface Props {
  barcode: DetectedBarcode | null
}

export function ExactMatchToast(props: Props) {
  const { barcode } = props
  return (
    <a
      href={barcode?.rawValue}
      target="_blank"
      rel="noreferrer noopener"
      className={'exact-match-toast ' + (barcode ? 'visible' : '')}
    >
      Quick open: {barcode?.rawValue}
    </a>
  )
}
