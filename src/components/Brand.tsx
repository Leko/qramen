import logo from '../logo.svg'
import './Brand.css'

export function Brand() {
  return (
    <header className="brand">
      <img src={logo} alt="QRamen" className="brand-logo" />
      <h1 className="brand-title">QRamen</h1>
    </header>
  )
}
