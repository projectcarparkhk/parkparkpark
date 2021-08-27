import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Header from '../../components/header'
import { getCarparkBySlug, getCarparks } from '../../sanityApi/carparks'
import { CarparkResponse } from '../../types/pages'
import Image from 'next/image'
import { imageBuilder } from '../../sanityApi/sanity'
import { StyledText } from '../../components/StyledText'
import { useRouter } from 'next/router'
import translations from '../../locales'
import post from '../../studio/schemas/documents/post'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface Carpark {
  carpark: CarparkResponse
}

const useStyles = makeStyles((theme: Theme) => ({
  carouselImage: {
    height: '30vh',
  },
  container: {
    padding: theme.spacing(2, 0),
  },
  section: {
    marginBottom: theme.spacing(2),
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
}))

const Carpark = ({ carpark }: Carpark) => {
  const classes = useStyles()
  const { locale } = useRouter()
  const fallbackLocale = locale || 'zh'
  const { latestPromotionsTitle } = translations[fallbackLocale]
  return (
    <div>
      <Container>
        <Header imageToTop={false} />
      </Container>
      <Carousel
        className={classes.carouselImage}
        swipe
        navButtonsAlwaysInvisible
      >
        {carpark.imagePath.map((path) => (
          <div>
            <Image
              src={imageBuilder(path).toString() || '/hk.webp'}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </Carousel>
      <Container>
        <div className={classes.container}>
          <div className={classes.section}>
            <StyledText size="h3" bold>
              {carpark.name[fallbackLocale]}
            </StyledText>
            <StyledText size="body1" className={classes.description}>
              {carpark.descriptions[fallbackLocale]}
            </StyledText>
            {carpark.tags.map((tag) => (
              <Chip
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
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <StyledText size="h4" bold className={classes.title}>
                  {latestPromotionsTitle}
                </StyledText>
              </AccordionSummary>

              {carpark.posts.map((post) => (
                <AccordionDetails>
                  <div className={classes.details}>
                    <CardMedia
                      className={classes.media}
                      image={
                        imageBuilder(post.imagePath).toString() || '/hk.webp'
                      }
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
                  {/* <div className={classes.postImageContainer}>
                    <Image
                      src={imageBuilder(post.imagePath).toString() || '/hk.webp'}
                      objectFit="none"
                      layout="fill"
                    />

                  </div>
                  <div>
                    <StyledText size="body1" bold className={classes.title}>
                      {post.title[fallbackLocale]}
                    </StyledText>
                    <StyledText size="subtitle1">
                      {post.shortDescription[fallbackLocale]}
                    </StyledText>
                  </div> */}
                </AccordionDetails>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Carpark

interface PathContext {
  locales: string[]
}

export async function getStaticPaths({ locales }: PathContext) {
  const carparksResponse = await getCarparks()
  const paths = carparksResponse.reduce(
    (acc, carpark) => ({
      ...acc,
      ...locales.map((locale) => ({
        params: { slug: 'post-1' },
        locale: locale,
      })),
    }),
    []
  )

  return { paths, fallback: false }
}

interface Context {
  params: {
    slug: string
  }
  preview: boolean
}

export async function getStaticProps({ params, preview }: Context) {
  const carpark = await getCarparkBySlug(params.slug, preview)

  console.log('carpark', JSON.stringify(carpark, null, 2))
  return {
    props: { carpark },
    revalidate: 1,
  }
}
