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

  search: {
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: 'white',
    width: '50%',
    height: '3.3rem',
    marginTop: theme.spacing(3),
    left: '50%',
    transform: 'translateX(-50%)',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
    fontSize: '1.3rem',
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
  const [isTagSelectOpen, setTagSelectOpen] = useState(false)
  const tags = useMemo(
    () =>
      districts.reduce((acc, district) => {
        acc.push({ name: district.name, slug: district.slug })
        acc.push(
          ...district.subDistricts
            .filter((sub) => sub.isHot)
            .map(({ name, slug }) => ({
              name,
              slug,
            }))
        )
        return acc
      }, [] as { name: string; slug: string }[]),
    [districts]
  )
  const classes = useStyles()
  const searchRef = useRef<HTMLDivElement>(null)

  const handleOnFocus = () => {
    setTagSelectOpen(true)
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchRef &&
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setTagSelectOpen(false)
    }
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  })

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
        <div className={classes.search} ref={searchRef}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            className={classes.inputInput}
            inputProps={{ 'aria-label': 'search' }}
            onFocus={handleOnFocus}
          />
          {isTagSelectOpen && (
            <div className={classes.tagSelect}>
              <div className={classes.tagSelectHeader}>
                <h3>熱門地區</h3>
                <h4>
                  <Link href="/districts">全部地區</Link>
                </h4>
              </div>
              <div className={classes.tagsContainer}>
                {tags.map((tag) => (
                  <Chip
                    className={classes.chip}
                    key={tag.name}
                    label={tag.name}
                    component="a"
                    href={`/sub-districts/${tag.slug}`}
                    clickable
                  />
                ))}
              </div>
            </div>
          )}
        </div>
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
  const districts = await getSubDistrictsGroupByDistrict()
  return {
    props: { posts, districts, preview },
    revalidate: 1,
  }
}
