import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getHotPosts, getLatestPosts } from '../sanityApi/posts'
import { getSubDistrictsGroupByArea } from '../sanityApi/subDistricts'
import Header from '../components/header'
import { Container, useMediaQuery } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { AreaCategory, Section, SectionProps } from '../components/Section'
import SearchInput from '../components/search/SearchInput'
import { StyledText } from '../components/StyledText'
import UndecoratedLink from '../components/UndecoratedLink'
import {
  PostResponse,
  HotTagResponse,
  TranslatedCarpark,
  CarparkResponse,
} from '../types/pages'
import translations from '../locales'
import { useRouter } from 'next/router'
import { imageBuilder } from '../sanityApi/sanity'
import { SupportedLanguages } from '../constants/SupportedLanguages'
import { getCarparks } from '../sanityApi/carparks'
import { getHotTags } from '../sanityApi/tags'
import { orderCarparkByPriceToday } from '../sanityApi/toApplication/carparks'
import { AreaResponse } from '../types/api/AreaResponse'
import { StyledButton } from '../components/StyledButton'
import Footer from '../components/footer/footer'
import { translatePosts } from '../utils/translatePosts'
import { translateCarparks } from '../utils/translateCarparks'
import theme from '../styles/theme'
import { useScrollPosition } from '../hooks/useScrollPosition'

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: 10,
    height: '45vh',
    [theme.breakpoints.up('sm')]: {
      height: '65vh',
      position: 'relative',
      overflow: 'visible',
    },
    padding: theme.spacing(0, 2, 2, 2),
    backgroundImage:
      'linear-gradient(rgba(8, 8, 8, 0), rgba(8, 8, 8, 0.5) 70%, black 100%), url(\'/backdrop.png\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '3px 6px 15px -8px #000000;',
  },
  sloganContainerLarge: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    top: '20vh',
  },

  sloganContainer: {
    position: 'relative',
    color: 'white',
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  subSlogan: {
    fontWeight: 700,
    color: 'white',
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      fontSize: '2rem',
    },
  },
  mainSlogan: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      fontSize: '3.5rem',
      marginBottom: '1.5rem',
    },
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
    padding: theme.spacing(4, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4, 0),
    },
    backgroundColor: theme.palette.grey[100],
  },
}))

interface IProps {
  latestPosts: PostResponse[]
  hotPosts: PostResponse[]
  orderedCarparks: CarparkResponse[]
  hotTags: HotTagResponse[]
  areas: AreaResponse[]
}

export default function Index({
  latestPosts,
  hotPosts,
  orderedCarparks,
  hotTags,
  areas,
}: IProps) {
  const classes = useStyles()
  const { locale } = useRouter()
  const fallbackLocale = (locale as SupportedLanguages) || 'zh'
  const [scrollTop] = useScrollPosition()
  const [backdropHeight, setBackdropHeight] = useState(0)

  const translatedLatestPosts = useMemo(
    () => translatePosts(latestPosts, fallbackLocale),
    [latestPosts, fallbackLocale]
  )

  const translatedHotPosts = useMemo(
    () => translatePosts(hotPosts, fallbackLocale),
    [hotPosts, fallbackLocale]
  )

  const translatedCarparks: TranslatedCarpark[] = useMemo(
    () => translateCarparks(orderedCarparks, fallbackLocale),
    [orderedCarparks, fallbackLocale]
  )

  const translatedHotTags = useMemo(() => {
    return hotTags.map((tag) => {
      const { name } = tag[fallbackLocale]
      const { _id, imagePath, slug } = tag
      return {
        _id,
        subtitle: name,
        imagePath: imageBuilder(imagePath).toString() || '/hk.webp',
        slug,
      }
    })
  }, [hotTags, fallbackLocale])
  const smOrAbove = useMediaQuery(theme.breakpoints.up('sm'))

  const {
    mainSlogan,
    subSlogan,
    latestCarparkPromotions,
    cheapestCarparkPromotions,
    cheapestCarparksHeader,
    hotCarparkTagsHeader,
    checkoutAll,
  } = translations[locale || 'zh']

  const hotTagIdString = translatedHotTags.map((tag) => tag._id).join(',')

  const postSections: SectionProps[] = [
    {
      subPath: '/post',
      fullCarousel: true,
      sectionHeader: latestCarparkPromotions,
      postItems: translatedLatestPosts,
      slidingCard: true,
    },
    {
      subPath: '/post',
      sectionHeader: cheapestCarparkPromotions,
      postItems: translatedHotPosts,
      slidingCard: true,
    },
    {
      subPath: '/carpark',
      sectionHeader: cheapestCarparksHeader,
      postItems: translatedCarparks,
      limited: true,
      renderSideLink: () => (
        <UndecoratedLink href="/carparks">{checkoutAll}</UndecoratedLink>
      ),
      renderButton: () => (
        <Link href="/carparks">
          <StyledButton variant="outlined" color="primary">
            <StyledText size="h6" bold>
              {checkoutAll}
            </StyledText>
          </StyledButton>
        </Link>
      ),
    },
    {
      subPath: '/carparks?tags=',
      sectionHeader: hotCarparkTagsHeader,
      postItems: translatedHotTags,
      limited: true,
      fullImage: true,
      renderSideLink: () => (
        <UndecoratedLink href={`/carparks?categories=${hotTagIdString}`}>
          {checkoutAll}
        </UndecoratedLink>
      ),
      renderButton: () => (
        <Link href={`/carparks?categories=${hotTagIdString}`}>
          <StyledButton variant="outlined" color="primary">
            <StyledText size="h6" bold>
              {checkoutAll}
            </StyledText>
          </StyledButton>
        </Link>
      ),
    },
  ]

  const scrollPercent = useMemo(() => {
    const toolbarHeight = parseInt(theme.mixins.toolbar.minHeight as string)
    const scrolled = scrollTop - backdropHeight
    const minPercent = scrolled < 0 ? 0 : scrolled / toolbarHeight
    const maxPercent = minPercent > 1 ? 1 : minPercent
    return maxPercent
  }, [scrollTop, backdropHeight])

  const backdropRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (backdropRef.current) {
      const current = backdropRef.current
      setBackdropHeight(current.offsetHeight)
    }
  }, [backdropRef, backdropRef.current])

  return (
    <>
      <div className={classes.backdrop} ref={backdropRef}>
        <div style={{ marginTop: theme.spacing(7) }}>
          <Header imageToTop position="absolute" />
        </div>
        {smOrAbove ? (
          <div className={classes.sloganContainerLarge}>
            <div className={classes.subSlogan}>{subSlogan}</div>
            <div className={classes.mainSlogan}>{mainSlogan}</div>
            <SearchInput />
          </div>
        ) : (
          <>
            <Link href="/search">
              <div>
                <SearchInput />
              </div>
            </Link>
            <div className={classes.sloganContainer}>
              <div className={classes.subSlogan}>{subSlogan}</div>
              <div className={classes.mainSlogan}>{mainSlogan}</div>
            </div>
          </>
        )}
      </div>

      <Header scrolled={scrollPercent} position="sticky" />

      <div>
        <Container maxWidth={smOrAbove ? 'lg' : 'md'}>
          <AreaCategory areas={areas} />
        </Container>
      </div>

      {postSections.map((section, i) => (
        <div
          key={section.sectionHeader}
          style={
            i % 2 === 0 ? {} : { backgroundColor: theme.palette.grey[200] }
          }
          className={classes.sectionContainer}
        >
          <Container maxWidth={smOrAbove ? 'lg' : 'md'}>
            <Section {...section} />
          </Container>
        </div>
      ))}
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const latestPosts = await getLatestPosts()
  const hotPosts = await getHotPosts()
  const carparks = await getCarparks()
  const hotTags = await getHotTags(false)

  // building once per day to reduce front-end's load
  const orderedCarparks = orderCarparkByPriceToday(carparks)
  const areas = await getSubDistrictsGroupByArea(false)
  return {
    props: { latestPosts, hotPosts, orderedCarparks, hotTags, areas },
    revalidate: 1,
  }
}
