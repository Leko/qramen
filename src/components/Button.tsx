import './Button.css'

interface Props {
  href?: string
  openAsNewTab?: boolean
  children: React.ReactNode
  onClick?: () => unknown
}

export function Button(props: Props) {
  const { href, openAsNewTab, children, onClick } = props

  if (href) {
    const attrs = openAsNewTab
      ? {
          target: '_blank',
          rel: 'noreferrer noopener',
        }
      : {}
    return (
      <a className="button" href={href} {...attrs}>
        {children}
      </a>
    )
  }

  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}
