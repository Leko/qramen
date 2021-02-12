import './Button.css'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  href?: string
  openAsNewTab?: boolean
  children: React.ReactNode
  onClick?: () => unknown
}

export function Button(props: Props) {
  const { type, disabled, href, openAsNewTab, children, onClick } = props

  if (href) {
    const attrs = openAsNewTab
      ? {
          target: '_blank',
          rel: 'noreferrer noopener',
        }
      : {}
    return (
      <a className="button" href={disabled ? undefined : href} {...attrs}>
        {children}
      </a>
    )
  }

  return (
    <button
      className="button"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
