import React, { Suspense, StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Metric } from 'web-vitals'
import { Onboarding } from './components/Onboarding'
import { useAgreement } from './hooks/agreement'
import reportWebVitals from './reportWebVitals'
import './index.css'

const App = React.lazy(() => import('./App'))

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
  // @ts-expect-error gtag is defined globally
  gtag('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate
  })
}
reportWebVitals(sendToAnalytics)
