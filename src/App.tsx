import React, { useState } from 'react'
import { QRCodeScanner } from './components/QRCodeScanner'
import { DetectionOverlay } from './components/DetectionOverlay'
import { ExactMatchToast } from './components/ExactMatchToast'
import { ScanResultItem } from './components/ScanResultItem'
import { Instruction } from './components/Instruction'
import { Brand } from './components/Brand'
import { Footer } from './components/Footer'
import type { DetectedBarcode } from './hooks/useBarcodeDetector'

import './App.css'

const width = window.innerWidth
const height = (window.innerHeight / 3) * 2

function App() {
  const [latest, setLatest] = useState<DetectedBarcode[]>([])
  const [lastScanned, setLastScanned] = useState<DetectedBarcode[]>([])

  function updateResult(results: DetectedBarcode[]) {
    setLatest(results)
    if (results.length) {
      setLastScanned(results)
    }
  }

  return (
    <div className="App">
      <Brand />
      <main className="main">
        <div className="video-area">
          <div className="user-media-preview">
            <QRCodeScanner onResult={updateResult} {...{ width, height }} />
          </div>
          <div className="detection-result">
            <DetectionOverlay barcodes={latest} {...{ width, height }} />
          </div>
          <div className="exact-match">
            <ExactMatchToast barcode={lastScanned[0]} />
          </div>
        </div>
        {lastScanned.length > 0 ? (
          <div className="scan-results">
            <h2>All scan results</h2>
            <ul>
              {lastScanned.map((barcode) => (
                <ScanResultItem
                  key={barcode.rawValue}
                  barcode={lastScanned[0]}
                />
              ))}
            </ul>
          </div>
        ) : (
          <Instruction />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
