import React, { useMemo } from 'react'
import { getHotPosts, getLatestPosts } from '../sanityApi/posts'
import { getSubDistrictsGroupByArea } from '../sanityApi/subDistricts'
import Header from '../components/header'
import { Container, InputBase, useMediaQuery } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Link from 'next/link'
import { AreaCategory, Section, SectionProps } from '../components/Section'
import SearchInput, {
  useStyles as useSearchBoxStyles,
} from '../components/search/input'
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
import { Suggestion } from '../components/search/type'
import { Fade } from '@material-ui/core'
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
    justifyContent: 'space-between',
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
    position: 'absolute',
    top: '20vh',
  },

  sloganContainer: {
    position: 'relative',
    color: 'white',
    width: '100%',
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
  const searchBoxClasses = useSearchBoxStyles()
  const { push, locale } = useRouter()
  const fallbackLocale = (locale as SupportedLanguages) || 'zh'

  const [scrollTop] = useScrollPosition()

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
    searchPlaceholder,
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

  function onSuggestionClick(suggestion: Suggestion) {
    switch (suggestion.type) {
      case 'subDistrict':
        push({
          pathname: '/carparks',
          query: { subDistricts: suggestion.slug },
        })
        break
      case 'carpark':
        push({
          pathname: `/carparks/${suggestion.slug}`,
        })
        break
    }
  }

  const SearchSection = () => (
    <>
      {smOrAbove ? (
        <SearchInput onSuggestionClick={onSuggestionClick}>
          <></>
        </SearchInput>
      ) : (
        <Link href="/search">
          <div className={searchBoxClasses.searchBox}>
            <div className={searchBoxClasses.searchIcon}>
              <SearchIcon fontSize={smOrAbove ? 'large' : 'default'} />
            </div>
            <InputBase
              placeholder={searchPlaceholder}
              className={searchBoxClasses.inputInput}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Link>
      )}
    </>
  )
  return (
    <>
      <div className={classes.backdrop}>
        <Header imageToTop />
        {smOrAbove ? (
          <div className={classes.sloganContainerLarge}>
            <div className={classes.subSlogan}>{subSlogan}</div>
            <div className={classes.mainSlogan}>{mainSlogan}</div>
            <SearchSection />
          </div>
        ) : (
          <>
            <SearchSection />
            <div className={classes.sloganContainer}>
              <div className={classes.subSlogan}>{subSlogan}</div>
              <div className={classes.mainSlogan}>{mainSlogan}</div>
            </div>
          </>
        )}
      </div>

      <Header appear={scrollTop > window.innerHeight * 0.6} />

      <div className={classes.sectionContainer}>
        <Container maxWidth={smOrAbove ? 'md' : 'lg'}>
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
          <Container maxWidth={smOrAbove ? 'md' : 'lg'}>
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
