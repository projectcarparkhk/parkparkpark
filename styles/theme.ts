import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
    mixins: {
        toolbar: {
            minHeight: 48
        }
    }
})

export default theme
