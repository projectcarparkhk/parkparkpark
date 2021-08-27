import {
  Theme,
  withStyles,
} from '@material-ui/core'
import { Chip } from '@material-ui/core'


export const StyledChip = withStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      height: '1.2rem',
    },
  },
  label: {
    padding: theme.spacing(0, 1),
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 0.7),
      fontSize: '0.6rem',
    },
  },
}))(Chip)