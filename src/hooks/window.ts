import { useCallback, useEffect, useState } from 'react'

export function useWindowFocus() {
  const [active, setActive] = useState<boolean>(document.hasFocus())

  const onFocus = useCallback(() => {
    setActive(true)
  }, [])

  const onBlur = useCallback(() => {
    setActive(false)
  }, [])

  useEffect(() => {
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [onFocus, onBlur])

  return {
    active,
  }
}
