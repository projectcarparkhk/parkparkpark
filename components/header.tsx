import Link from 'next/link'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  headerTitle: {
    fontWeight: 'bold',
    margin: '0.5rem 0 0.5rem 0',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  slogan: {
    marginBottom: '0.5rem',
    fontSize: '0.8rem',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}))
export default function Header() {
  const classes = useStyles()
  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <div>
            <h2 className={classes.headerTitle}>
              <Link href="/">
                <span className="hover:underline">ParkParkPark!</span>
              </Link>
            </h2>
            <div className={classes.slogan}>全港商場免費泊車及停車場優惠</div>

          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  )
}
