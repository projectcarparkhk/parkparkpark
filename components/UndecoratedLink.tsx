import Link from 'next/link'
import React from 'react'

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
