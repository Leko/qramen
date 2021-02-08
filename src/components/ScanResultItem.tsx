import React from 'react'
import { DetectedBarcode } from '../hooks/useBarcodeDetector'
import './ScanResultItem.css'

interface Props {
  barcode: DetectedBarcode
}

export function ScanResultItem(props: Props) {
  const { barcode } = props
  return (
    <li
      className="scan-result-item-wrap"
      style={{ borderLeftColor: barcode.hashColor }}
    >
      <a
        className="scan-result-item"
        href={barcode.rawValue}
        target="_blank"
        rel="noreferrer noopener"
      >
        {barcode.rawValue}
      </a>
    </li>
  )
}
