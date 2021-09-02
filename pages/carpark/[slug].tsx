import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardMedia,
  Chip,
  Container,
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from '@material-ui/core'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Header from '../../components/header'
import {
  getCarparkBySlug,
  getCarparks,
  getNearbyCarparks,
} from '../../sanityApi/carparks'
import { CarparkResponse, PostResponse } from '../../types/pages'
import Image from 'next/image'
import { imageBuilder } from '../../sanityApi/sanity'
import { StyledText } from '../../components/StyledText'
import { useRouter } from 'next/router'
import translations from '../../locales'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { SupportedLanguages } from '../../constants/SupportedLanguages'
import { CarparkPost } from '../../types/api/CarparkResponse'
import { Section, SectionProps } from '../../components/Section'
import { useMemo } from 'react'
import { StyledButton } from '../../components/StyledButton'
import { getHotPosts } from '../../sanityApi/posts'
import Footer from '../../components/footer/footer'
import { withStyles } from '@material-ui/core'
import { translateCarparks } from '../../utils/translateCarparks'
import { translatePosts } from '../../utils/translatePosts'
import UndecoratedLink from '../../components/UndecoratedLink'
import {
  parseDayData,
  parseHourData,
  parseTimeData,
} from '../../utils/parseData'
import PriceDetailTable from '../../components/table/PriceDetailTable'
interface IProps {
  carpark: CarparkResponse
  nearbyCarparks: CarparkResponse[]
  nearbyBestPromotions: PostResponse[]
}

const useStyles = makeStyles((theme: Theme) => ({
  carouselImage: {
    height: '30vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    padding: theme.spacing(2, 0),
  },
  section: {
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(1),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  media: {
    height: '4rem',
    width: '4rem',
    borderRadius: theme.spacing(1),
  },
  content: {
    flex: 1,
    padding: theme.spacing(1),
  },
  details: {
    display: 'flex',
    alignItems: 'center',
  },
  tableTitle: {
    padding: theme.spacing(0.5, 1),
    minWidth: '25%',
  },
  tableCell: {
    padding: theme.spacing(0.5, 1),
  },
  feeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  paymentContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  paymentIconContainer: {
    height: '20px',
    width: '20px',
    position: 'relative',
    marginRight: theme.spacing(2),
  },
  sectionContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 0),
  },
  accordionSummary: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  accordionSummaryContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  activeIndicator: {
    backgroundColor: theme.palette.primary.main + ' !important',
    width: '24px !important',
  },
  nonActiveIndicator: {
    height: '7px',
    width: '7px',
    borderRadius: '10px',
    backgroundColor: theme.palette.grey[400],
    margin: theme.spacing(1.5, 0.5),
  },
  indicator: {
    position: 'absolute',
    bottom: 2,
  },
}))

const CarparkPage = ({
  carpark,
  nearbyCarparks,
  nearbyBestPromotions,
}: IProps) => {
  const classes = useStyles()
  const router = useRouter()
  const fallbackLocale = (router.locale as SupportedLanguages) || 'zh'
  const {
    latestPromotionsLabel,
    carparkFeeLabel,
    dayNightFeeLabel,
    nearbyCarparksLabel,
    checkoutAll,
    paymentMethodLabel,
    nearbyBestPromotionsLabel,
  } = translations[fallbackLocale]

  const translatedNearbyCarparks = useMemo(
    () => translateCarparks(nearbyCarparks, fallbackLocale),
    [nearbyCarparks, fallbackLocale]
  )

  const translatedNearbyBestPromotions = useMemo(
    () => translatePosts(nearbyBestPromotions, fallbackLocale),
    [nearbyBestPromotions, fallbackLocale]
  )

  const carparkSubDistrictIdsString = carpark.subDistricts.map(subDistrict => subDistrict._id).join(',')

  const postSections: SectionProps[] = [
    {
      subPath: '/carpark',
      sectionHeader: nearbyCarparksLabel,
      postItems: translatedNearbyCarparks,
      limited: true,
      renderButton: () => (
        <Link href={`/carparks?subDistricts=${carparkSubDistrictIdsString}`} style={{ width: '100%' }}>
          <StyledButton variant="outlined" color="primary">
            <StyledText size="h6" bold>
              {checkoutAll}
            </StyledText>
          </StyledButton>
        </Link>
      ),
    },
    {
      sectionHeader: nearbyBestPromotionsLabel,
      postItems: translatedNearbyBestPromotions,
      slidingCard: true,
    },
  ]

  const Promotions = ({ post }: { post: CarparkPost }) => (
    <UndecoratedLink href={post.slug}>
      <div className={classes.details}>
        <CardMedia
          className={classes.media}
          image={imageBuilder(post.imagePath).toString() || '/hk.webp'}
        />
        <div className={classes.content}>
          <StyledText size="body1" bold className={classes.title}>
            {post.title[fallbackLocale]}
          </StyledText>
          <StyledText size="subtitle1">
            {post.shortDescription[fallbackLocale]}
          </StyledText>
        </div>
      </div>
    </UndecoratedLink>
  )

  const StyledChip = withStyles((theme: Theme) => ({
    root: {
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      borderRadius: '4px',
    },
    label: {
      color: theme.palette.primary.main,
    },
  }))(Chip)

  return (
    <div>
      <Container>
        <Header imageToTop={false} />
      </Container>
      <Carousel
        swipe
        navButtonsAlwaysInvisible
        autoPlay={false}
        IndicatorIcon={<div></div>}
        activeIndicatorIconButtonProps={{ className: classes.activeIndicator }}
        indicatorIconButtonProps={{ className: classes.nonActiveIndicator }}
        indicatorContainerProps={{ className: classes.indicator }}
      >
        {carpark.imagePath.map((path) => (
          <div
            key={path}
            className={classes.carouselImage}
            style={{
              backgroundImage: `linear-gradient(rgba(8, 8, 8, 0), rgba(8, 8, 8, 0.1) 70%, grey 100%), url('${
                imageBuilder(path).toString() || '/hk.webp'
              }')`,
            }}
          ></div>
        ))}
      </Carousel>
      <Container>
        <div className={classes.container}>
          <div className={classes.section}>
            <StyledText size="h3" bold className={classes.title}>
              {carpark.name[fallbackLocale]}
            </StyledText>
            <StyledText size="body1" className={classes.description}>
              {carpark.descriptions[fallbackLocale]}
            </StyledText>
            {carpark.tags.map((tag) => (
              <StyledChip
                variant="outlined"
                size="small"
                key={tag.slug}
                label={tag.name[fallbackLocale]}
                className={classes.chip}
              />
            ))}
          </div>
          <div className={classes.section}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.accordionSummary}
              >
                <div className={classes.accordionSummaryContent}>
                  <StyledText size="h4" bold className={classes.title}>
                    {latestPromotionsLabel}
                  </StyledText>
                </div>
              </AccordionSummary>

              {carpark.posts.map((post) => (
                <AccordionDetails key={post.slug}>
                  <Promotions post={post} />
                </AccordionDetails>
              ))}
            </Accordion>
          </div>
          <div className={classes.section}>
            <div className={classes.feeContainer}>
              <StyledText size="h4" bold className={classes.title}>
                {carparkFeeLabel}
              </StyledText>
            </div>
            <PriceDetailTable priceDetails={carpark.priceDetails}/>
          </div>
          {carpark.dayNightPriceDetails.length > 0 && <div className={classes.section}>
            <div className={classes.feeContainer}>
              <StyledText size="h4" bold className={classes.title}>
                {dayNightFeeLabel}
              </StyledText>
            </div>
            <PriceDetailTable priceDetails={carpark.dayNightPriceDetails}/>
          </div>}
          <div className={classes.section}>
            <StyledText size="h4" bold className={classes.title}>
              {paymentMethodLabel}
            </StyledText>
            {carpark.paymentMethods.map((method) => (
              <div
                className={classes.paymentContainer}
                key={`${method.name[fallbackLocale]}_${method.iconPath}`}
              >
                <div className={classes.paymentIconContainer}>
                  <Image
                    src={imageBuilder(method.iconPath).toString() || '/hk.webp'}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <StyledText size="body1">
                  {method.name[fallbackLocale]}
                </StyledText>
              </div>
            ))}
          </div>
          <div className={classes.section}>
            {postSections.map((section) => (
              <div
                key={section.sectionHeader}
                className={classes.sectionContainer}
              >
                <Section {...section} />
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default CarparkPage

interface StaticPathContext {
  locales: string[]
}
interface Path {
  params: { slug: string }
  locale: string
}

export async function getStaticPaths({ locales }: StaticPathContext) {
  const carparksResponse = await getCarparks()
  const paths = carparksResponse.reduce(
    (acc, carpark) => [
      ...acc,
      ...locales.map((locale) => ({ params: { slug: carpark.slug }, locale })),
    ],
    [] as Path[]
  )

  return { paths, fallback: false }
}

interface StaticPropsContext {
  params: {
    slug: string
  }
  preview: boolean
}

export async function getStaticProps({ params, preview }: StaticPropsContext) {
  const carpark = await getCarparkBySlug(params.slug, preview)
  const subDistrictIds = carpark.subDistricts.map(
    (subDistrict) => subDistrict._id
  )
  const nearbyCarparks = await getNearbyCarparks(subDistrictIds)
  // todo when final structure is defined
  const nearbyBestPromotions = await getHotPosts()
  return {
    props: { carpark, nearbyCarparks, nearbyBestPromotions },
    revalidate: 1,
  }
}
