import { useCallback } from 'react'
import pkg from '../../package.json'
import './Instruction.css'

const hasShareAPI = 'share' in navigator

export function Instruction() {
  const onShare = useCallback((e) => {
    e.preventDefault()
    navigator.share({
      url: pkg.homepage,
      title: document.title,
    })
  }, [])

  return (
    <aside className="instruction-help-wrap">
      <div className="instruction">
        <h2 className="instruction-title">Scan QR codes</h2>
        <p>Scan the QR code and the result will be displayed here.</p>
      </div>
      <div className="help">
        <p className="help-description">
          Something went wrong? <a href={pkg.bugs}>Report a bug</a>
        </p>
        {hasShareAPI ? (
          <p className="help-share">
            <a href={pkg.homepage} onClick={onShare}>
              Share the app
            </a>
          </p>
        ) : null}
      </div>
    </aside>
  )
}
