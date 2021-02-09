import pkg from '../../package.json'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <small className="footer-item">
        &copy; 2021- <a href="https://leko.jp">Leko</a>
      </small>
      <a className="footer-item" href={pkg.repository}>
        GitHub
      </a>
    </footer>
  )
}
