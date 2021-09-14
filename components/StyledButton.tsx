import { withStyles, Button, Theme } from '@material-ui/core'

export const StyledButton = withStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '40%',
    },
  },
}))(Button)
