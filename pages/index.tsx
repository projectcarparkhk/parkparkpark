import React, { useRef, useState } from 'react'
import { getPostsForHome, getSubDistrictsGroupByDistrict } from '../lib/api'
import Image from 'next/image'
import { CMS_NAME } from '../lib/constants'
import Header from '../components/header'
import {
  Button,
  Chip,
  Container,
  Divider,
  InputBase,
  Paper,
} from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { PostResponse, DistrictResponse } from '../types'
import Link from 'next/link'
import { CarouselBanner } from '../components/carousel'
import { PostSection } from '../components/PostSection'
import { useStyles as useSearchBoxStyles } from '../components/search/input'

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: -1,
    height: '80vh',
  },
  imageContainer: {
    top: theme.spacing(8),
    height: '70vh',
    position: 'absolute',
    width: '100vw',
  },
  slogan: {
    position: 'relative',
    color: 'white',
    textAlign: 'center',
    fontSize: '3.5rem',
    margin: theme.spacing(8, 0, 1, 0),
  },
  subslogan: {
    fontSize: '2rem',
    margin: theme.spacing(0),
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
    padding: theme.spacing(5, 0),
  },
}))

interface IProps {
  posts: PostResponse[]
  districts: DistrictResponse[]
  preview: boolean
}

export default function Index({ posts, districts, preview }: IProps) {

  const classes = useStyles()
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


  return (
    <>
      <Header />
      <div className={classes.backdrop}>
        <div className={classes.imageContainer}>
          <Image src="/backdrop.jpeg" layout="fill" objectFit="cover" />
        </div>
        <h1 className={classes.slogan}>搜尋全港最新泊車優惠</h1>
        <div className={`${classes.slogan} ${classes.subslogan}`}>
          幫你更快搵到位，慳錢慳時間
        </div>
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
      </div>
      <Container maxWidth="lg">
        <div className={classes.sectionContainer}>
          <CarouselBanner items={items} />
        </div>
        <div className={classes.sectionContainer}>
          <PostSection />
        </div>
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
