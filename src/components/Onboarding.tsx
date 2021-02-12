import { FormEvent, useCallback, useState } from 'react'
import logo from '../logo.svg'
import pkg from '../../package.json'
import { useBrowserCompatibility } from '../hooks/browser-compatibility'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import './Onboarding.css'

interface Props {
  onCompleted: (allowTracking: boolean) => unknown
}

export function Onboarding(props: Props) {
  const { onCompleted } = props
  const [allowTracking, setAllowTracking] = useState(true)
  const {
    hasBarcodeDetector,
    supportedQRCodeFormat,
  } = useBrowserCompatibility()

  const valid = hasBarcodeDetector && supportedQRCodeFormat

  const onChangeCheck = useCallback(
    (checked: boolean) => {
      setAllowTracking(checked)
    },
    [setAllowTracking]
  )
  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      onCompleted(allowTracking)
    },
    [onCompleted, allowTracking]
  )

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
      <form onSubmit={onSubmit}>
        <div className="onboarding-tracking">
          <Checkbox
            value={allowTracking}
            onChange={onChangeCheck}
            label={
              'Allow anonymized performance measurement to improve this app'
            }
          />
        </div>
        {valid ? (
          <div className="onboarding-submit-wrap">
            <Button type="submit">Start scanning</Button>
          </div>
        ) : (
          <p className="onboarding-errors">This browser is unsupported.</p>
        )}
      </form>
    </div>
  )
}
