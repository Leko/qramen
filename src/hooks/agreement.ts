import { useState } from 'react'

const KEY_ONBOARDING_COMPLETED = '@qramen/ONBOARDING_COMPLETED'
const KEY_ALLOW_TRACKING = '@qramen/ALLOW_TRACKING'

export function useAgreement() {
  const VALUE = '1'
  const [isAgreed, _setAgreedAt] = useState(
    localStorage.getItem(KEY_ONBOARDING_COMPLETED) || false
  )

  function agree(allowTracking: boolean) {
    _setAgreedAt(VALUE)
    localStorage.setItem(KEY_ONBOARDING_COMPLETED, VALUE)

    // @ts-expect-error See index.html
    window['ga-disable-G-N9094HXPS6'] = allowTracking
    if (allowTracking) {
      localStorage.setItem(KEY_ALLOW_TRACKING, '1')
    }
  }

  return {
    isAgreed: isAgreed === VALUE,
    agree,
  }
}
