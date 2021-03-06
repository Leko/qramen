import React, { useLayoutEffect, useRef, useState } from 'react'
import { QRCodeScanner } from './components/QRCodeScanner'
import { DetectionOverlay } from './components/DetectionOverlay'
import { ExactMatchToast } from './components/ExactMatchToast'
import { ScanResultItem } from './components/ScanResultItem'
import { Instruction } from './components/Instruction'
import { Brand } from './components/Brand'
import { Footer } from './components/Footer'
import type { DetectedBarcode } from './hooks/useBarcodeDetector'

import './App.css'

function App() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [dimension, setDimention] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  )
  const [ready, setReady] = useState(false)
  const [latest, setLatest] = useState<DetectedBarcode[]>([])
  const [lastScanned, setLastScanned] = useState<DetectedBarcode[]>([])

  function updateResult(results: DetectedBarcode[]) {
    setReady(true)
    setLatest(results)
    if (results.length && results[0].rawValue) {
      setLastScanned(results)
    }
  }
  function handleError(error: Error) {
    setReady(false)
  }

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const { width, height } = ref.current!.getBoundingClientRect()
    setDimention({ width, height })
  }, [ref])

  return (
    <div className="App">
      <Brand />
      <main className="main">
        <div className="video-area" ref={ref}>
          <div className="user-media-preview">
            <QRCodeScanner
              onResult={updateResult}
              onError={handleError}
              {...dimension}
            />
          </div>
          {ready ? (
            <>
              <div className="detection-result">
                <DetectionOverlay barcodes={latest} {...dimension} />
              </div>
              <div className="exact-match">
                <ExactMatchToast barcode={lastScanned[0]} />
              </div>
            </>
          ) : null}
        </div>
        <div className="results-area">
          {lastScanned.length > 0 ? (
            <div className="scan-results">
              <h2 className="scan-results-heading">Scan results</h2>
              <ul>
                {lastScanned.map((barcode) => (
                  <ScanResultItem
                    key={barcode.rawValue}
                    barcode={lastScanned[0]}
                  />
                ))}
              </ul>
            </div>
          ) : ready ? (
            <Instruction />
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
