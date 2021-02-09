import React, { useState } from 'react'
import { QRCodeScanner } from './components/QRCodeScanner'
import { DetectionOverlay } from './components/DetectionOverlay'
import { ExactMatchToast } from './components/ExactMatchToast'
import { ScanResultItem } from './components/ScanResultItem'
import { Brand } from './components/Brand'
import { Footer } from './components/Footer'
import type { DetectedBarcode } from './hooks/useBarcodeDetector'
import pkg from '../package.json'

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
          <>
            <div className="instruction">
              <h2 className="instruction-title">Scan QR code</h2>
              <p className="instruction-description">
                When the scanning was success, show results here.
              </p>
            </div>
            <div className="help">
              <p className="help-description">
                Something went wrong? <a href={pkg.bugs}>Report a bug</a>
              </p>
              {'share' in navigator ? (
                <p className="help-share">
                  <a
                    href={
                      // eslint-disable-next-line no-restricted-globals
                      location.href
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      navigator.share({
                        // eslint-disable-next-line no-restricted-globals
                        url: location.href,
                        title: document.title,
                      })
                    }}
                  >
                    Share QRamen
                  </a>
                </p>
              ) : null}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
