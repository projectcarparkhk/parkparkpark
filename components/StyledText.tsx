import { Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import React from 'react'

interface IProps {
  className?: string;
  size: "inherit" | Variant;
  children: React.ReactNode
}
export const StyledText = ({ className: klasses = '', size, children}: IProps) => {

  return (
    <Typography variant={size} className={klasses} >
      {children}
    </Typography>
  )
}
