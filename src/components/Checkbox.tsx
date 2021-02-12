import { useCallback } from 'react'
import './Checkbox.css'

interface Props {
  value: boolean
  label: React.ReactNode
  onChange: (checked: boolean) => unknown
}

export function Checkbox(props: Props) {
  const { value, label, onChange } = props

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked)
    },
    [onChange]
  )

  return (
    <label className="checkbox-label">
      <input type="checkbox" checked={value} onChange={handleChange} />
      {label}
    </label>
  )
}
