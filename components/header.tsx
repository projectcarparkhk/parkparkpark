import Link from 'next/link'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { StyledText } from '../components/StyledText'
import translations from '../locales'
import { useRouter } from 'next/router'

type HeaderProps = {
  imageToTop?: boolean
  appear?: boolean
}

type AppBarStyleProps = HeaderProps

const useStyles = makeStyles<Theme, AppBarStyleProps>((theme) => ({
  appBar: {
    height: theme.mixins.toolbar.minHeight,
    color: (props) => (props.imageToTop ? 'white' : theme.palette.primary.main),
    backgroundColor: (props) => (props.imageToTop ? 'transparent' : 'white'),
    [theme.breakpoints.up('sm')]: {
      height: theme.mixins.toolbar.maxHeight,
    },
    opacity: 0,
    visibility: (props) => (props.appear ? 'visible' : 'hidden'),
    transition: 'visibility 0.01s, opacity 0.01s ease-in-out',
  },
  appBarVisible: {
    opacity: 1,
    visibility: 'visible',
  },
  toolBar: {
    minHeight: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up('sm')]: {
      height: theme.mixins.toolbar.maxHeight,
    },
  },
  title: {
    flexGrow: 1,
  },
  offset: {
    marginTop: theme.spacing(4),
  },
}))
export default function Header({ imageToTop, appear = true }: HeaderProps) {
  const classes = useStyles({
    imageToTop,
    appear,
  })
  const { locale } = useRouter()
  const { homeTitle } = translations[locale || 'zh']
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        className={`${classes.appBar} ${appear && classes.appBarVisible}`}
      >
        <Toolbar className={classes.toolBar}>
          <Link href="/search-all">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Link>
          <div className={classes.title}>
            <Link href="/">
              <span className="hover:underline">
                <StyledText size="h5" bold>
                  {homeTitle}
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
