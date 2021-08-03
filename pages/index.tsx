import React from 'react'
import { getPostsForHome, getSubDistrictsGroupByDistrict } from '../lib/api'
import Image from 'next/image'
import { CMS_NAME } from '../lib/constants'
import Header from '../components/header'
import { popularAreas, postItems } from '../mocks/constants'
import { Button, Container, InputBase } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { PostResponse, DistrictResponse } from '../types'
import Link from 'next/link'
import { CarouselBanner } from '../components/carousel'
import { PostSection, PostSectionProps } from '../components/PostSection'
import { useStyles as useSearchBoxStyles } from '../components/search/input'
import { StyledText } from '../components/StyledText'
import UndecoratedLink from '../components/UndecoratedLink'

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: -1,
    height: '40vh',
    padding: theme.spacing(8, 2, 2, 2),
    backgroundImage: `linear-gradient(rgba(8, 8, 8, 0), rgba(8, 8, 8, 0.5) 70%, black 100%), url('/backdrop.jpeg')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  sloganContainer: {
    position: 'relative',
    color: 'white',
  },
  subSlogan: {
    fontWeight: 700
  },
  mainSlogan: {
    fontSize: '1.5rem',
    fontWeight: 700
  },
  tagSelect: {
    borderRadius: '30px',
    backgroundColor: 'white',
    width: '100%',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 3),
  },
  tagSelectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tagsContainer: {
    padding: theme.spacing(1, 0),
  },
  chip: {
    margin: theme.spacing(0, 2, 1, 0),
  },
  sectionContainer: {
    padding: theme.spacing(2, 0),
  },
}))

interface IProps {
  posts: PostResponse[]
  districts: DistrictResponse[]
  preview: boolean
}

export default function Index({ posts, districts, preview }: IProps) {
  const imageToTop = true
  const classes = useStyles({
    imageToTop
  })
  const searchBoxClasses = useSearchBoxStyles()

  const items = [
    {
      image: '/carousel1.jpeg',
      postSlug: '/abc',
    },
    {
      image: '/carousel2.jpeg',
      postSlug: '/def',
    },
  ]

  const StyledButton = withStyles((theme: Theme) => ({
    root: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '30%',
      },
    },
  }))(Button)

  const postSections: PostSectionProps[] = [
    {
      sectionHeader: '最近瀏覽',
      postItems: postItems,
    },
    {
      sectionHeader: '附近',
      postItems: postItems,
      limited: true,
      renderSideLink: () => (
        <UndecoratedLink href="/nearby">探索香港</UndecoratedLink>
      ),
      renderButton: () => (
        <Link href="/nearby">
          <StyledButton variant="outlined" color="primary">
            <StyledText size="h6" bold>
              顯示全部
            </StyledText>
          </StyledButton>
        </Link>
      ),
    },
    {
      sectionHeader: '熱門地區',
      postItems: postItems,
      limited: true,
      renderSideLink: () => (
        <UndecoratedLink href="/nearby">探索香港</UndecoratedLink>
      ),
      renderButton: () => (
        <Link href="/nearby">
          <StyledButton variant="outlined" color="primary">
            <StyledText size="h6" bold>
              顯示全部
            </StyledText>
          </StyledButton>
        </Link>
      ),
    },
    {
      sectionHeader: '熱門優惠',
      postItems: popularAreas,
      fullCarousel: true,
      
      renderButton: () => (
        <Link href="/nearby">
          <StyledButton variant="outlined" color="primary">
            <StyledText size="h6" bold>
              全部目的地
            </StyledText>
          </StyledButton>
        </Link>
      ),
    },
  ]

  return (
    <>
      <Header imageToTop />
      <div className={classes.backdrop}>
        <Link href="/search">
          <div className={searchBoxClasses.searchBox}>
            <div className={searchBoxClasses.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="搜尋地區 / 停車場"
              className={searchBoxClasses.inputInput}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Link>
        <div className={classes.sloganContainer}>
          <div className={classes.subSlogan}>搜尋全港最新泊車優惠</div>
          <div className={classes.mainSlogan}>幫你更快搵到位，慳錢慳時間</div>
        </div>
        </div>
      <Container maxWidth="lg">
        <div className={classes.sectionContainer}>
          <CarouselBanner items={items} />
        </div>
        {postSections.map((section, i) => (
          <div className={classes.sectionContainer}>
            <PostSection 
              {...section}
            />
          </div>
        ))}
      </Container>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const posts = await getPostsForHome(preview)
  const districts = await getSubDistrictsGroupByDistrict(preview)
  return {
    props: { posts, districts, preview },
    revalidate: 1,
  }
}
