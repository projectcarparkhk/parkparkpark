import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 480,
      sm: 960,
      md: 1366,
      lg: 1536,
      xl: 1920,
    }
  }
})

export default theme
