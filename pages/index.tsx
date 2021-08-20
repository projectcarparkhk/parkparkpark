import React, { useMemo } from 'react'
import { getHotPosts, getLatestPosts } from '../sanityApi/posts'
import { getSubDistrictsGroupByArea } from '../sanityApi/subDistricts'
import Header from '../components/header'
import { Button, Container, InputBase, SvgIconProps } from '@material-ui/core'
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
  HotTagResponse,
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
import { orderCarparkByPriceToday } from '../sanityApi/toApplication'
import { getHotTags } from '../sanityApi/tags'
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import GestureIcon from '@material-ui/icons/Gesture'; 
import NatureIcon from '@material-ui/icons/Nature';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

interface IndexStyleProps {
  iconColor?: string
}

const useStyles = makeStyles<Theme, IndexStyleProps>((theme: Theme) => ({
  backdrop: {
    zIndex: -1,
    height: '35vh',
    padding: theme.spacing(8, 2, 2, 2),
    backgroundImage: 'linear-gradient(rgba(8, 8, 8, 0), rgba(8, 8, 8, 0.5) 70%, black 100%), url(\'/backdrop.png\')',
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
      alignItems: 'center'
    }
  },
  icon: {
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(6),
    background: props => props.iconColor,
    '& svg': {
      fill: '#666',
      width: '0.95rem',
      height: '0.95rem',
    }
  }
}))

interface IProps {
  latestPosts: PostResponse[]
  hotPosts: PostResponse[]
  orderedCarparks: CarparkContextToday[]
  hotTags: HotTagResponse[]
  areas: any[]

}
interface AProps {
  areas: any[]
}

const areaConfig = [
  {
    icon: <FilterHdrIcon />,
    color: '#e4f3ea'
  },
  {
    icon: <GestureIcon />,
    color: '#ffece8'
  },
  {
    icon: <NatureIcon />,
    color: '#fff6e4'
  },
  {
    icon: <MoreHorizIcon />,
    color: '#f0edfc'
  }
]

interface IconCircleProps {
  color: string
  children: React.ReactElement<SvgIconProps>
}

function IconCircle({ color, children }: IconCircleProps) {
  const classes = useStyles({
    iconColor: color
  })

  return (
    <div className={classes.icon}>
      {children}
    </div>
  )
}

function AreaCategory({ areas }: AProps) {
  const classes = useStyles({})
  return (
    <div className={classes.sectionContainer}>
      <StyledText size="h4" bold>
        地區分類
      </StyledText>
      <div className={classes.areaIconContainer}>
        {[...areas, {
          _id: 'more',
          name: '更多',
          slug: ''
        }].map((area, i) => {
          return (
            <Link 
              href={{
                pathname: '/all',
                query: { area: area.slug },
              }}
              key={area._id}
            >
              <div>
                <IconCircle 
                  color={areaConfig[i].color}
                >
                {areaConfig[i].icon}
                </IconCircle>
                {area.name}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function Index({ latestPosts,
  hotPosts,
  orderedCarparks,
  hotTags,
  areas }: IProps) {
  const classes = useStyles({})
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
      const shortDescription = priceDetail ? `$${priceDetail.price} / ${
        durationTranslations[
          priceDetail.hr as keyof typeof durationTranslations
        ][fallBackLocale]
      }` : ''
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
        subtitle: name,
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
        <AreaCategory 
          areas={areas} 
        />
        {postSections.map((section) => (
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
  const areas = await getSubDistrictsGroupByArea(false)
  return {
    props: { latestPosts, hotPosts, orderedCarparks, hotTags, areas },
    revalidate: 1,
  }
}
