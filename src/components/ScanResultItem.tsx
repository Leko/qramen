import React from 'react'
import { DetectedBarcode } from '../hooks/useBarcodeDetector'
import './ScanResultItem.css'

interface Props {
  barcode: DetectedBarcode
}

export function ScanResultItem(props: Props) {
  const { barcode } = props
  return (
    <li className="scan-result-item-wrap">
      <a
        href={barcode.rawValue}
        className="scan-result-item"
        style={{ borderLeftColor: barcode.hashColor, color: barcode.hashColor }}
      >
        {barcode.rawValue}
      </a>
    </li>
  )
}
