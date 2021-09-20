import Link from 'next/link'
import { AppBar, Toolbar, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { StyledText } from '../components/StyledText'
import translations from '../locales'
import { useRouter } from 'next/router'
import theme from '../styles/theme'
import React from 'react'
import SearchInput from './search/SearchInput'

type HeaderProps = {
  imageToTop?: boolean
  scrolled?: number
  position?: 'sticky' | 'absolute'
}

type AppBarStyleProps = {
  imageToTop?: boolean
}

const useStyles = makeStyles<Theme, AppBarStyleProps>((theme) => ({
  appBar: {
    color: (props) => (props.imageToTop ? 'white' : theme.palette.primary.main),
    backgroundColor: (props) => (props.imageToTop ? 'transparent' : 'white'),
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexGrow: 0,
      marginRight: theme.spacing(2),
    },
    cursor: 'pointer',
  },
}))
export default function Header({
  imageToTop,
  scrolled,
  position,
}: HeaderProps) {
  const classes = useStyles({
    imageToTop,
  })
  const { locale, pathname } = useRouter()
  const { homeTitle } = translations[locale || 'zh']
  const smOrAbove = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <>
      <AppBar
        position={position}
        elevation={0}
        color="transparent"
        className={`${classes.appBar}`}
        style={{ opacity: scrolled }}
      >
        <Toolbar>
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
          {smOrAbove && pathname !== '/' && <SearchInput size="sm" />}
          {!smOrAbove && (
            <Link href="/search">
              <IconButton edge="end" color="inherit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}
