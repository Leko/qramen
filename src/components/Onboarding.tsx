import { Button } from './Button'
import logo from '../logo.svg'
import pkg from '../../package.json'
import './Onboarding.css'
import { useBrowserCompatibility } from '../hooks/browser-compatibility'

interface Props {
  onCompleted: () => unknown
}

export function Onboarding(props: Props) {
  const { onCompleted } = props
  const {
    hasBarcodeDetector,
    supportedQRCodeFormat,
  } = useBrowserCompatibility()

  const valid = hasBarcodeDetector && supportedQRCodeFormat

  return (
    <div className="onboarding">
      <header className="onboarding-heading">
        <div className="onboarding-brand-wrap">
          <img src={logo} alt="QRamen" className="onboarding-brand-logo" />
          <h1 className="onboarding-brand-title">QRamen</h1>
        </div>
        <p>Privacy first online QR code scanner</p>
      </header>

      <ul className="onboarding-features">
        <li>
          100% open source (<a href={pkg.repository}>GitHub repository</a>)
        </li>
        <li>Do not send scanned data anywhere</li>
        <li>No need to install</li>
        <li>Works offline if you add it to your home screen</li>
      </ul>
      {valid ? (
        <div className="onboarding-submit-wrap">
          <Button onClick={onCompleted}>Start scanning</Button>
        </div>
      ) : (
        <p className="onboarding-errors">This browser is unsupported.</p>
      )}
    </div>
  )
}
