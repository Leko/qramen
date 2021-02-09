import { useState } from 'react'

export function useAgreement() {
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
