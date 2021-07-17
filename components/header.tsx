import Link from 'next/link'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}))
export default function Header() {
  const classes = useStyles()
  return (
    <>
      <AppBar>
        <Toolbar>
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