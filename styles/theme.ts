import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: 54,
      maxHeight: 75,
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 440,
      md: 850,
      lg: 1280,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#54B175',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333333',
      secondary: '#888888',
    },
  },
})
theme.typography.h1 = {
  fontSize: '2rem',
}
theme.typography.h2 = {
  fontSize: '1.45rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
  },
}
theme.typography.h3 = {
  fontSize: '1.3rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
  },
}

theme.typography.h4 = {
  fontSize: '1.15rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
}

theme.typography.h5 = {
  fontSize: '1rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem',
  },
}

theme.typography.h6 = {
  fontSize: '0.9rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
}

theme.typography.subtitle1 = {
  fontSize: '1.1rem',
  fontWeight: 'normal',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.6rem',
  },
}

theme.typography.subtitle2 = {
  fontSize: '0.8rem',
  fontWeight: 'normal',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
}

theme.typography.body1 = {
  fontSize: '0.6rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.8rem',
  },
}

export default theme
