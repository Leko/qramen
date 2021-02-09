import { Button } from './Button'
import type { DetectedBarcode } from '../hooks/useBarcodeDetector'
import './ExactMatchToast.css'

interface Props {
  barcode: DetectedBarcode | null
}

export function ExactMatchToast(props: Props) {
  const { barcode } = props
  return (
    <div className={'exact-match-toast ' + (barcode ? 'visible' : '')}>
      <Button href={barcode?.rawValue} openAsNewTab>
        Open: {barcode?.rawValue}
      </Button>
    </div>
  )
}
