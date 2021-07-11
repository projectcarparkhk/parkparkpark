import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import React, { ElementType } from 'react'
import { StyledText } from './StyledText'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    margin: theme.spacing(3, 0),
  },
}))

interface IProps {}
export const PostSection = ({}: IProps) => {
  const classes = useStyles()
  return (
    <div className={classes.section}>
      <StyledText size="h3">鄰近你的泊車優惠</StyledText>
    </div>
  )
}
