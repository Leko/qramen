import React, { useState } from 'react'
import { Onboarding } from './components/Onboarding'
import { QRCodeReader } from './components/QRCodeReader'
import { DetectionOverlay } from './components/DetectionOverlay'
import { ExactMatchToast } from './components/ExactMatchToast'
import { ScanResultItem } from './components/ScanResultItem'
import { DetectedBarcode } from './hooks/useBarcodeDetector'

import './App.css'

function useAgreement() {
  const KEY = 'reqr-agreed-at'
  const VALUE = '1'
  const [isAgreed, _setAgreedAt] = useState(localStorage.getItem(KEY) || false)

  function agree() {
    _setAgreedAt(VALUE)
    localStorage.setItem(KEY, VALUE)
  }

  return {
    isAgreed: isAgreed === VALUE,
    agree,
  }
}

const width = window.innerWidth
const height = window.innerHeight / 2

function App() {
  const { isAgreed, agree } = useAgreement()
  const [latest, setLatest] = useState<DetectedBarcode[]>([])
  const [lastScanned, setLastScanned] = useState<DetectedBarcode[]>([])

  function updateResult(results: DetectedBarcode[]) {
    setLatest(results)
    if (results.length) {
      setLastScanned(results)
    }
  }

  if (!isAgreed) {
    return <Onboarding onCompleted={agree} />
  }

  return (
    <div className="App">
      <header className="brand">
        <h1>QRamen</h1>
      </header>
      <main>
        <div className="video-area">
          <div className="user-media-preview">
            <QRCodeReader onResult={updateResult} {...{ width, height }} />
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
        ) : null}
      </main>
      <footer className="footer">
        <small className="footer-item">&copy; 2021- Leko</small>
        <a className="footer-item" href="https://github.com/Leko/reqr">
          GitHub repo
        </a>
      </footer>
    </div>
  )
}

export default App
