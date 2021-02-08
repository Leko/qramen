import React, { useState } from 'react'
import { Onboarding } from './components/Onboarding'
import { QRCodeScanner } from './components/QRCodeScanner'
import { DetectionOverlay } from './components/DetectionOverlay'
import { ExactMatchToast } from './components/ExactMatchToast'
import { ScanResultItem } from './components/ScanResultItem'
import { DetectedBarcode } from './hooks/useBarcodeDetector'
import logo from './logo.svg'

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
const height = (window.innerHeight / 3) * 2

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
        <img src={logo} className="brand-logo" />
        <h1 className="brand-title">QRamen</h1>
      </header>
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
          <div className="instruction">
            <h2 className="instruction-title">Scan QR code</h2>
            <p className="instruction-description">
              Something went wrong?{' '}
              <a href="https://github.com/Leko/qramen">Report a bug</a>
            </p>
            {'share' in navigator ? (
              <p className="instruction-share">
                <a
                  href={
                    // eslint-disable-next-line no-restricted-globals
                    location.href
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    // eslint-disable-next-line no-restricted-globals
                    navigator.share({ url: location.href })
                  }}
                >
                  Share QRamen
                </a>
              </p>
            ) : null}
          </div>
        )}
      </main>
      <footer className="footer">
        <small className="footer-item">
          &copy; 2021- <a href="https://leko.jp">Leko</a>
        </small>
        <a className="footer-item" href="https://github.com/Leko/qramen">
          GitHub
        </a>
      </footer>
    </div>
  )
}

export default App
