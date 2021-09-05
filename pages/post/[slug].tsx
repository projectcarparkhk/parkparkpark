import { Container, Divider, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Header from '../../components/header'
import { PostResponse } from '../../types/pages'
import { StyledText } from '../../components/StyledText'
import { useRouter } from 'next/router'
import translations from '../../locales'
import { SupportedLanguages } from '../../constants/SupportedLanguages'
import { getAllPosts, getPostBySlug } from '../../sanityApi/posts'
import Footer from '../../components/footer/footer'
import { format } from 'date-fns'
import PromotionDetailTable from '../../components/table/PromotionDetailTable'
import BlockContent from '@sanity/block-content-to-react'
interface IProps {
  post: PostResponse
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    margin: theme.spacing(2.5, 0),
  },
  subSection: {
    margin: theme.spacing(3, 0),
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
  const {
    authorLabel,
    createdAtLabel,
    updatedAtLabel,
    promotionDatesLabel,
    promotionDetailsLabel,
    promotionMoreDetailsLabel
  } = translations[fallbackLocale]

  const serializers = {
    types: {
      block: (props: any) => {
        const {style = 'normal'} = props.node
      
        if (style === 'normal') {
          return <div style={{fontSize: '5px'}}> {props.children}</div>
        }
      
        if (style === 'blockquote') {
          return <blockquote>- {props.children}</blockquote>
        }
      
        // Fall back to default handling
        return (BlockContent as any).defaultSerializers.types.block(props)
      }
    },
  }

  console.log('bodyyy', JSON.stringify(post.body, null, 2))
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
            <div>
              <StyledText
                bold
                inline
                size="subtitle1"
                className={classes.infoTitle}
              >
                {promotionDatesLabel}
              </StyledText>
              <StyledText inline size="subtitle2">
                {`${format(
                  new Date(post.startAndExpiryDates.startDate),
                  'yyyy-MM-dd'
                )} - ${format(
                  new Date(post.startAndExpiryDates.expiryDate),
                  'yyyy-MM-dd'
                )}`}
              </StyledText>
            </div>
          </div>
          <Divider light />
          <div className={classes.subSection}>
            <StyledText size="h2" className={classes.subSection}>
              {promotionDetailsLabel}
            </StyledText>
            <PromotionDetailTable promotionDetails={post.promotionDetails} />
          </div>
          <div className={classes.subSection}>
            <StyledText size="h2" className={classes.subSection}>
              {promotionMoreDetailsLabel}
            </StyledText>
            <BlockContent blocks={post.body[fallbackLocale]} serializers={serializers}/>
          </div>
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
