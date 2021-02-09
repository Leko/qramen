import React, { Suspense, StrictMode, useState } from 'react'
import ReactDOM from 'react-dom'
import { Metric } from 'web-vitals'
import { Onboarding } from './components/Onboarding'
import reportWebVitals from './reportWebVitals'
import './index.css'

const App = React.lazy(() => import('./App'))

function useAgreement() {
  const KEY = 'reqr-agreed-at'
  const VALUE = '1'
  const [isAgreed, _setAgreedAt] = useState(localStorage.getItem(KEY) || false)

  function agree() {
    _setAgreedAt(VALUE)
    localStorage.setItem(KEY, VALUE)
  }

  return {
    isAgreed: isAgreed === VALUE,
    agree,
  }
}

function Root() {
  const { isAgreed, agree } = useAgreement()

  if (!isAgreed) {
    return <Onboarding onCompleted={agree} />
  }

  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  )
}

ReactDOM.render(
  <StrictMode>
    <Root />
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
