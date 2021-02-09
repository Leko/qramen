import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Metric } from 'web-vitals'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.css'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)

function sendToAnalytics({ id, name, value }: Metric) {
  // @ts-expect-error ga is defined globally
  gtag('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate
  })
}
reportWebVitals(sendToAnalytics)
