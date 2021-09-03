import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardMedia,
  Chip,
  Container,
  Divider,
  Link,
  makeStyles,
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
import { getAllPosts, getPostBySlug } from '../../sanityApi/posts'
import Footer from '../../components/footer/footer'
import { format } from 'date-fns'

interface IProps {
  post: PostResponse
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    margin: theme.spacing(3, 0),
  },
  subSection: {
    margin: theme.spacing(1.5, 0),
  },
  postType: {
    color: theme.palette.primary.main,
  },
  infoTitle: {
    marginRight: theme.spacing(1.5),
  },
}))

const PostPage = ({ post }: IProps) => {
  const classes = useStyles()
  const router = useRouter()
  const fallbackLocale = (router.locale as SupportedLanguages) || 'zh'
  const { authorLabel, createdAtLabel, updatedAtLabel } =
    translations[fallbackLocale]
  return (
    <div>
      <Container>
        <Header imageToTop={false} />
        <main className={classes.main}>
          <StyledText
            size="h5"
            className={`${classes.subSection} ${classes.postType}`}
          >
            {post.postType.name[fallbackLocale]}
          </StyledText>
          <StyledText size="h1" className={classes.subSection}>
            {post.title[fallbackLocale]}
          </StyledText>
          <StyledText size="subtitle1" className={classes.subSection}>
            {post.shortDescription[fallbackLocale]}
          </StyledText>
          <div className={classes.subSection}>
            <div>
              <StyledText
                bold
                inline
                size="subtitle1"
                className={classes.infoTitle}
              >
                {authorLabel}
              </StyledText>
              <StyledText inline size="subtitle2">
                {post.author.name[fallbackLocale]}
              </StyledText>
            </div>
            <div>
              <StyledText
                bold
                inline
                size="subtitle1"
                className={classes.infoTitle}
              >
                {createdAtLabel}
              </StyledText>
              <StyledText inline size="subtitle2">
                {format(new Date(post._createdAt), 'yyyy-MM-dd')}
              </StyledText>
            </div>
            <div>
              <StyledText
                bold
                inline
                size="subtitle1"
                className={classes.infoTitle}
              >
                {updatedAtLabel}
              </StyledText>
              <StyledText inline size="subtitle2">
                {format(new Date(post._updatedAt), 'yyyy-MM-dd')}
              </StyledText>
            </div>
          </div>
          <Divider light />
        </main>
      </Container>
      <Footer />
    </div>
  )
}

export default PostPage

interface StaticPathContext {
  locales: string[]
}
interface Path {
  params: { slug: string }
  locale: string
}

export async function getStaticPaths({ locales }: StaticPathContext) {
  const postsResponse = await getAllPosts()
  const paths = postsResponse.reduce(
    (acc, post) => [
      ...acc,
      ...locales.map((locale) => ({ params: { slug: post.slug }, locale })),
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
  const post = await getPostBySlug(params.slug, preview)
  return {
    props: { post },
    revalidate: 1,
  }
}
