import { useTheme } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

interface IProps {
  href: string
  children: React.ReactNode
}

const UndecoratedLink = ({ href, children }: IProps) => {
  const theme = useTheme()
  return (
    <Link href={href}>
      <a style={{ textDecoration: 'none', color: theme.palette.primary.main, fontWeight: 'bold' }}>{children}</a>
    </Link>
  )
}

export default UndecoratedLink
