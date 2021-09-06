import { useTheme } from '@material-ui/core'
import React from 'react'

interface IProps {
  href: string
  children: React.ReactNode
  main?: boolean
}

const UndecoratedAnchor = ({ href, children, main }: IProps) => {
  const theme = useTheme()
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      style={{
        textDecoration: 'none',
        color: main ? theme.palette.primary.main : 'inherit',
        fontWeight: 'bold',
      }}
    >
      {children}
    </a>
  )
}

export default UndecoratedAnchor
