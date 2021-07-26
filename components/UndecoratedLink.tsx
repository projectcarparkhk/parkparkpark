import Link from 'next/link'
import { style } from '@material-ui/system'
import React from 'react'
import { StyledText } from './StyledText'
import { withStyles } from '@material-ui/core'

interface IProps{
  href: string;
  children: React.ReactNode
}


const UndecoratedLink = ({ href, children }: IProps) => {
  return (
      <Link href={href}>
        <a style={{ textDecoration: 'none' }}>{children}</a>
      </Link>
  )
}

export default UndecoratedLink;
