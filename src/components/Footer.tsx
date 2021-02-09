import pkg from '../../package.json'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <nav>
        <ul className="footer-item-list">
          <li className="footer-item">
            &copy; 2021- <a href="https://leko.jp">Leko</a>
          </li>
          <li className="footer-item">
            <a href={pkg.repository}>GitHub</a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
