import React, { useMemo } from 'react'
import { getHotPosts, getLatestPosts } from '../sanityApi/posts'
import Header from '../components/header'
import { Button, Container, InputBase } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Link from 'next/link'
import { Section, SectionProps } from '../components/Section'
import { useStyles as useSearchBoxStyles } from '../components/search/input'
import { StyledText } from '../components/StyledText'
import UndecoratedLink from '../components/UndecoratedLink'
import {
  CarparkContextToday,
  PostResponse,
  TagResponse,
  TranslatedCarpark,
} from '../types'
import translations from '../locales/pages/index'
import { useRouter } from 'next/router'
import { imageBuilder } from '../sanityApi/sanity'
import {
  SupportedLanguages,
  durationTranslations,
} from '../constants/SupportedLanguages'
import { getCarparks } from '../sanityApi/carparks'
import { orderCarparkByPriceToday } from '../sanityApi/toApplication/carparks'
import { getHotTags } from '../sanityApi/tags'

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: -1,
    height: '35vh',
    padding: theme.spacing(8, 2, 2, 2),
    backgroundImage: `linear-gradient(rgba(8, 8, 8, 0), rgba(8, 8, 8, 0.5) 70%, black 100%), url('/backdrop.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '3px 6px 15px -8px #000000;',
  },
  sloganContainer: {
    position: 'relative',
    color: 'white',
  },
  subSlogan: {
    fontWeight: 700,
    fontSize: '1rem',
  },
  mainSlogan: {
    fontSize: '1.8rem',
    fontWeight: 700,
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
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 0),
  },
}))

interface IProps {
  latestPosts: PostResponse[]
  hotPosts: PostResponse[]
  orderedCarparks: CarparkContextToday[]
  hotTags: TagResponse[]
}

export default function Index({
  latestPosts,
  hotPosts,
  orderedCarparks,
  hotTags
}: IProps) {
  const classes = useStyles()
  const searchBoxClasses = useSearchBoxStyles()
  const { locale } = useRouter()
  const fallBackLocale = (locale as SupportedLanguages) || 'zh'
  const translatedLatestPosts = useMemo(() => {
    return latestPosts.map((post) => {
      const { title, shortDescription } = post[fallBackLocale]
      const { _id, slug, imagePath } = post
      return {
        _id,
        slug,
        title,
        shortDescription,
        imagePath: imageBuilder(imagePath).toString() || '/hk.webp',
      }
    })
  }, [latestPosts, fallBackLocale])

  const translatedHotPosts = useMemo(() => {
    return hotPosts.map((post) => {
      const { title, shortDescription } = post[fallBackLocale]
      const { _id, slug, imagePath } = post
      return {
        _id,
        slug,
        title,
        shortDescription,
        imagePath: imageBuilder(imagePath).toString() || '/hk.webp',
      }
    })
  }, [hotPosts, fallBackLocale])

  const translatedCarparks: TranslatedCarpark[] = useMemo(() => {
    return orderedCarparks.map((carpark) => {
      const { tag, subDistrict, name } = carpark[fallBackLocale]
      const { priceDetail, _id, imagePath, slug } = carpark
      const shortDescription = `$${priceDetail.price} / ${
        durationTranslations[
          priceDetail.hr as keyof typeof durationTranslations
        ][fallBackLocale]
      }`
      return {
        _id,
        title: name,
        tags: tag.map((tag) => ({ label: tag.name })),
        location: subDistrict.name,
        imagePath: imageBuilder(imagePath).toString() || '/hk.webp',
        shortDescription,
        slug,
      }
    })
  }, [orderedCarparks, fallBackLocale])

  const translatedHotTags = useMemo(() => {
    return hotTags.map((tag) => {
      const { name } = tag[fallBackLocale];
      const { _id, imagePath, slug } = tag;
      return {
        _id,
        title: name,
        imagePath: imageBuilder(imagePath).toString() || '/hk.webp',
        slug
      }
    })
  }, [hotTags, fallBackLocale])

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

  const sections: SectionProps[] = [
    {
      sectionHeader: latestCarparkPromotions,
      postItems: translatedLatestPosts,
      slidingCard: true,
    },
    {
      sectionHeader: cheapestCarparkPromotions,
      postItems: translatedHotPosts,
      slidingCard: true,
    },
    {
      sectionHeader: cheapestCarparksHeader,
      postItems: translatedCarparks,
      limited: true,
      renderSideLink: () => (
        <UndecoratedLink href="/nearby">{checkoutAll}</UndecoratedLink>
      ),
      renderButton: () => (
        <Link href="/nearby">
          <StyledButton variant="outlined" color="primary">
            <StyledText size="h6" bold>
              {checkoutAll}
            </StyledText>
          </StyledButton>
        </Link>
      ),
    },
    {
      sectionHeader: hotCarparkTagsHeader,
      postItems: translatedHotTags,
      limited: true,
      fullImage: true,
      renderSideLink: () => (
        <UndecoratedLink href="/nearby">{checkoutAll}</UndecoratedLink>
      ),
      renderButton: () => (
        <Link href="/nearby">
          <StyledButton variant="outlined" color="primary">
            <StyledText size="h6" bold>
              {checkoutAll}
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
              placeholder={searchPlaceholder}
              className={searchBoxClasses.inputInput}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Link>
        <div className={classes.sloganContainer}>
          <div className={classes.subSlogan}>{subSlogan}</div>
          <div className={classes.mainSlogan}>{mainSlogan}</div>
        </div>
      </div>
      <Container maxWidth="lg">
        {sections.map((section) => (
          <div key={section.sectionHeader} className={classes.sectionContainer}>
            <Section {...section} />
          </div>
        ))}
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const latestPosts = await getLatestPosts()
  const hotPosts = await getHotPosts()
  const carparks = await getCarparks()
  const hotTags = await getHotTags(false);

  // building once per day to reduce front-end's load
  const orderedCarparks = orderCarparkByPriceToday(carparks)
  return {
    props: { latestPosts, hotPosts, orderedCarparks, hotTags },
    revalidate: 1,
  }
}
