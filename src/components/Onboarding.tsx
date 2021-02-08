import React from 'react'

interface Props {
  onCompleted: () => unknown
}

export function Onboarding(props: Props) {
  const { onCompleted } = props
  return (
    <div>
      <h2>QRamen</h2>
      <p>QRamen is a QR code scanner</p>

      <h3>Policy</h3>
      <ul>
        <li>No need to install</li>
        <li>Fully open-source</li>
        <li>Doesn't send scanning results</li>
      </ul>
      <button onClick={onCompleted}>Start scanning</button>
    </div>
  )
}
