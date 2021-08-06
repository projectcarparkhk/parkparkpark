import Link from 'next/link'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { StyledText } from '../components/StyledText'

type HeaderProps = {
  imageToTop: boolean
}

type AppBarStyleProps = HeaderProps

const useStyles = makeStyles<Theme, AppBarStyleProps>((theme) => ({
  appBar: {
    height: theme.mixins.toolbar.minHeight,
    paddingTop: theme.spacing(1),
    color: props => props.imageToTop ? 'white' : theme.palette.primary.main,
  },
  toolBar: {
    minHeight: theme.mixins.toolbar.minHeight,
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar
}))
export default function Header({ imageToTop }: HeaderProps) {
  const classes = useStyles({
    imageToTop
  })
  return (
    <>
      <AppBar position='absolute' elevation={0} color='transparent' className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
        <Link href="/all">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        </Link>
          <div className={classes.title}>
            <Link href="/">
              <span className="hover:underline">
              <StyledText size="h1" bold>
              ParkPark泊車資訊網
            </StyledText>
            </span>
            </Link>
          </div>
        <Link href="/search">
        <IconButton edge="end" color="inherit" aria-label="search">
          <SearchIcon />
        </IconButton>
        </Link>
        </Toolbar>
      </AppBar>
      {!imageToTop && <div className={classes.offset} />}
    </>
  )
}