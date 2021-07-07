import React, { useRef, useState } from 'react'
import { getPostsForHome, getSubDistrictsGroupByArea } from '../lib/api'
import Image from 'next/image'
import { CMS_NAME } from '../lib/constants'
import Header from '../components/header'
import { Chip, Container, Divider, InputBase } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { PostResponse, DistrictResponse } from '../types'

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    paddingTop: theme.spacing(8),
    zIndex: -1,
  },
  imageContainer: {
    height: '80vh',
    position: 'absolute',
    width: '100vw'
  },
  slogan: {
    position: 'relative',
    color: 'white',
    textAlign: 'center',
    fontSize: '3.5rem',
    margin: theme.spacing(8,0,1,0)
  },
  subslogan: {
    fontSize: '2rem',
    margin: theme.spacing(0)
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
    marginTop: theme.spacing(2)
  },
  tagsContainer: {
    padding: theme.spacing(1, 3),
  },
  chip: {
    margin: theme.spacing(0, 1, 1, 0),
  },
}))

interface IProps {
  posts: PostResponse[]
  areas: DistrictResponse[]
  preview: boolean
}

export default function Index({ posts, areas, preview }: IProps) {
  const [isTagSelectOpen, setTagSelectOpen] = useState(false)
  const districts = useMemo(
    () => areas.map((area) => ({ name: area.name, slug: area.slug })),
    [areas]
  )
  const tags = useMemo(
    () =>
      areas.reduce(
        (acc, area) => ({
          ...acc,
          [area.slug]: [
            { name: area.name, slug: area.slug },
            ...area.subDistricts.map((sub) => ({
              name: sub.name,
              slug: sub.slug,
            })),
          ],
        }),
        {} as { [key: string]: { name: string; slug: string }[] }
      ),
    [areas]
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
      console.log(!searchRef.current.contains(event.target as Node))
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
  return (
    <>
      <Header />
      <div className={classes.backdrop}>
        <div className={classes.imageContainer}>
          <Image src="/backdrop.jpeg" layout="fill" objectFit="cover" />
        </div>
        <h1 className={classes.slogan}>搜尋全港最新泊車優惠</h1>
        <div className={`${classes.slogan} ${classes.subslogan}`}>幫你更快搵到位，慳錢慳時間</div>
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
              {districts.map((district) => (
                <div className={classes.tagsContainer}>
                  <h3>{district.name}</h3>
                  {tags[district.slug].map((tag) => (
                    <Chip
                      className={classes.chip}
                      key={tag.name}
                      label={tag.name}
                    />
                  ))}
                  <Divider />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Container maxWidth="xl">
        
      </Container>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const posts = await getPostsForHome(preview)
  const areas = await getSubDistrictsGroupByArea()
  return {
    props: { posts, areas, preview },
    revalidate: 1,
  }
}
