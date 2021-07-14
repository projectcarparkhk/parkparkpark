import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  light: {
    primaryText: 'red',
  },
  dark: {
    primaryText: 'black',
  },
})

export default theme
