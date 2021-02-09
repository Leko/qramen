import { useCallback } from 'react'
import pkg from '../../package.json'
import './Footer.css'

const hasShareAPI = 'share' in navigator

export function Footer() {
  const onShare = useCallback((e) => {
    e.preventDefault()
    navigator.share({
      url: pkg.homepage,
      title: document.title,
    })
  }, [])

  return (
    <footer className="footer">
      <nav className="footer-nav">
        <ul className="footer-item-list">
          <li className="footer-item">
            &copy; 2021- <a href="https://leko.jp">Leko</a>
          </li>
          {hasShareAPI ? (
            <li className="footer-item">
              <a href={pkg.homepage} onClick={onShare}>
                Share the app
              </a>
            </li>
          ) : null}
          <li className="footer-item">
            <a href={pkg.repository}>GitHub</a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
