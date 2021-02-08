import React, { useState } from 'react'
import { Onboarding } from './components/Onboarding'
import { QRCodeReader } from './components/QRCodeReader'
import { DetectionOverlay } from './components/DetectionOverlay'
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
const height = window.innerHeight

function App() {
  const { isAgreed, agree } = useAgreement()
  const [detectResults, setDetectResults] = useState<DetectedBarcode[]>([])
  if (!isAgreed) {
    return <Onboarding onCompleted={agree} />
  }

  return (
    <div className="App">
      <header className="brand">
        <h1>QRamen</h1>
      </header>
      <div className="video-area">
        <div className="user-media-preview">
          <QRCodeReader onResult={setDetectResults} {...{ width, height }} />
        </div>
        <div className="detection-result">
          <DetectionOverlay barcodes={detectResults} {...{ width, height }} />
        </div>
      </div>
      <footer className="footer">
        <small>&copy; 2021- Leko</small>
        <a href="https://github.com/Leko/reqr">GitHub repo</a>
      </footer>
    </div>
  )
}

export default App
