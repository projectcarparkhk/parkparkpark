import { Box, Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import React from 'react'

interface IProps {
  className?: string
  size: 'inherit' | Variant
  children: React.ReactNode
  bold?: boolean
  inline?: boolean
  style?: React.CSSProperties
}

export const StyledText = ({
  className: klasses = '',
  style,
  size,
  children,
  bold,
  inline,
}: IProps) => {
  return (
    <Typography
      variant={size}
      className={klasses}
      display={inline ? 'inline' : 'block'}
    >
      <Box
        display="inline"
        fontWeight={bold ? 'fontWeightBold' : 'fontWeightRegular'}
        style={style}
      >
        {children}
      </Box>
    </Typography>
  )
}
