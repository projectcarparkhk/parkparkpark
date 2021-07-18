import Link from 'next/link'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    height: theme.mixins.toolbar.minHeight
  },
  toolBar: {
    minHeight: theme.mixins.toolbar.minHeight
  },
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))
export default function Header() {
  const classes = useStyles()
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
        <Link href="/all">
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        </Link>
          <h2>
            <Link href="/">
              <span className="hover:underline">ParkParkPark!</span>
            </Link>
          </h2>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  )
}