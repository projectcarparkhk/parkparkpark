import { useTheme } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

interface IProps {
  href: string
  children: React.ReactNode
  main?: boolean
}

const UndecoratedLink = ({ href, children, main }: IProps) => {
  const theme = useTheme()
  return (
    <Link href={href}>
      <a style={{ textDecoration: 'none', color: main ? theme.palette.primary.main : 'inherit', fontWeight: 'bold' }}>{children}</a>
    </Link>
  )
}

export default UndecoratedLink
