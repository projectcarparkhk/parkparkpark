import React, { useMemo } from 'react'
import { getHotPosts, getLatestPosts } from '../sanityApi/posts'
import { getSubDistrictsGroupByArea } from '../sanityApi/subDistricts'
import Header from '../components/header'
import { Container, InputBase, SvgIconProps } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Link from 'next/link'
import { Section, SectionProps } from '../components/Section'
import { useStyles as useSearchBoxStyles } from '../components/search/input'
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
import {
  SupportedLanguages,
} from '../constants/SupportedLanguages'
import { getCarparks } from '../sanityApi/carparks'
import { getHotTags } from '../sanityApi/tags'
import FilterHdrIcon from '@material-ui/icons/FilterHdr'
import GestureIcon from '@material-ui/icons/Gesture'
import NatureIcon from '@material-ui/icons/Nature'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { orderCarparkByPriceToday } from '../sanityApi/toApplication/carparks'
import { AreaResponse } from '../types/api/AreaResponse'
import { StyledButton } from '../components/StyledButton'
import Footer from '../components/footer/footer'
import { translatePosts } from '../utils/translatePosts'
import { translateCarparks } from '../utils/translateCarparks'

interface IndexStyleProps {
  iconColor?: string
}

const useStyles = makeStyles<Theme, IndexStyleProps>((theme: Theme) => ({
  backdrop: {
    zIndex: -1,
    height: '35vh',
    padding: theme.spacing(8, 2, 2, 2),
    backgroundImage:
      'linear-gradient(rgba(8, 8, 8, 0), rgba(8, 8, 8, 0.5) 70%, black 100%), url(\'/backdrop.png\')',
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
  areaIconContainer: {
    margin: theme.spacing(2, 0),
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    width: '100%',
    textAlign: 'center',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  icon: {
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(6),
    background: (props) => props.iconColor,
    '& svg': {
      fill: '#666',
      width: '0.95rem',
      height: '0.95rem',
    },
  },
}))

interface IProps {
  latestPosts: PostResponse[]
  hotPosts: PostResponse[]
  orderedCarparks: CarparkResponse[]
  hotTags: HotTagResponse[]
  areas: AreaResponse[]
}
interface AProps {
  areas: AreaResponse[]
  locale: SupportedLanguages
}

const areaConfig = [
  {
    icon: <FilterHdrIcon />,
    color: '#e4f3ea',
  },
  {
    icon: <GestureIcon />,
    color: '#ffece8',
  },
  {
    icon: <NatureIcon />,
    color: '#fff6e4',
  },
  {
    icon: <MoreHorizIcon />,
    color: '#f0edfc',
  },
]

interface IconCircleProps {
  color: string
  children: React.ReactElement<SvgIconProps>
}

function IconCircle({ color, children }: IconCircleProps) {
  const classes = useStyles({
    iconColor: color,
  })

  return <div className={classes.icon}>{children}</div>
}

function AreaCategory({ areas, locale }: AProps) {
  const classes = useStyles({})
  const { areaSelection } = translations[locale]
  return (
    <div className={classes.sectionContainer}>
      <StyledText size="h4" bold>
        {areaSelection}
      </StyledText>
      <div className={classes.areaIconContainer}>
        {[
          ...areas,
          {
            _id: 'more',
            name: {
              en: 'More',
              zh: '更多',
            },
            slug: 'more',
          },
        ].map((area, i) => (
          <Link
            href={{
              pathname: '/search-all',
              query: { ['sub-district']: area.slug },
            }}
            key={area._id}
          >
            <div>
              <IconCircle color={areaConfig[i].color}>
                {areaConfig[i].icon}
              </IconCircle>
              {area.name[locale]}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Index({
  latestPosts,
  hotPosts,
  orderedCarparks,
  hotTags,
  areas,
}: IProps) {
  const classes = useStyles({})
  const searchBoxClasses = useSearchBoxStyles()
  const { locale } = useRouter()
  const fallbackLocale = (locale as SupportedLanguages) || 'zh'

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

  const postSections: SectionProps[] = [
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
        <AreaCategory areas={areas} locale={fallbackLocale} />
        {postSections.map((section) => (
          <div key={section.sectionHeader} className={classes.sectionContainer}>
            <Section {...section} />
          </div>
        ))}
      </Container>
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
