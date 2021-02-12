import './Instruction.css'

export function Instruction() {
  return (
    <aside className="instruction-help-wrap">
      <div className="instruction">
        <div>
          {/* @ts-ignore */}
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_VBwuuR.json"
            background="transparent"
            style={{ width: 120, height: 120 }}
            loop
            autoplay
          />
        </div>
        <div className="instruction-pane">
          <h2 className="instruction-title">Scan QR codes</h2>
          <p>Scan the QR code and the result will be displayed here.</p>
        </div>
      </div>
    </aside>
  )
}
