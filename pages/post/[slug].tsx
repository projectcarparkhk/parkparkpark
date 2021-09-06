import { Container, Divider, makeStyles, Theme } from '@material-ui/core'
import React, { ReactNode, useState } from 'react'
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
import UndecoratedAnchor from '../../components/UndecoratedAnchor'
import LinkIcon from '@material-ui/icons/Link'
import FacebookIcon from '@material-ui/icons/Facebook'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'

import { FacebookShareButton, WhatsappShareButton } from 'react-share'
import { useEffect } from 'react'
interface IProps {
  post: PostResponse
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    margin: theme.spacing(3, 0),
  },
  subSection: {
    margin: theme.spacing(3.5, 0),
  },
  postType: {
    color: theme.palette.primary.main,
  },
  infoTitle: {
    marginRight: theme.spacing(2),
  },
  pageSource: {
    border: '1px solid ' + theme.palette.grey[400],
    padding: theme.spacing(3, 3),
  },
  pageSourceTitle: {
    marginBottom: theme.spacing(2),
  },
  number: {
    marginRight: theme.spacing(2),
  },
  shareContainer: {
    display: 'flex',
    alignItem: 'center',
  },
  shareBtnContainer: {
    display: 'flex',
    alignItem: 'center',
  },
  shareBtn: {
    '&hover:': {
      color: theme.palette.grey[400],
    },
    marginRight: theme.spacing(2),
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
    promotionMoreDetailsLabel,
    sourceListLabel,
    shareLabel,
  } = translations[fallbackLocale]

  const [share, setShare] = useState<Array<ReactNode>>([])
  useEffect(() => {
    if (typeof window !== undefined) {
      setShare([
        <FacebookShareButton
          children={<FacebookIcon />}
          url={window ? window.location.href : ''}
        />,
        <WhatsappShareButton
          children={<WhatsAppIcon />}
          url={window ? window.location.href : ''}
        />,
      ])
    }
  }, [])

  // console.log('body', JSON.stringify(post.body[fallbackLocale], null, 2))
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
            <BlockContent blocks={post.body[fallbackLocale]} />
          </div>
          <div className={classes.pageSource}>
            <StyledText size="subtitle1" className={classes.pageSourceTitle}>
              {sourceListLabel}
            </StyledText>
            {post.externalLink.map((link, i) => (
              <UndecoratedAnchor href={link.url}>
                <StyledText
                  size="subtitle1"
                  className={classes.number}
                  bold
                  inline
                >
                  {i + 1}
                </StyledText>
                <StyledText size="subtitle1" bold inline>
                  {link.title[fallbackLocale]}
                </StyledText>
              </UndecoratedAnchor>
            ))}
          </div>
          <div className={classes.subSection}>
            <div className={classes.shareContainer}>
              <StyledText
                bold
                inline
                size="subtitle1"
                className={classes.infoTitle}
              >
                {shareLabel}
              </StyledText>
              <div className={classes.shareBtnContainer}>
                <LinkIcon
                  className={classes.shareBtn}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                  }}
                />
                {share.map((elem) => (
                  <div className={classes.shareBtn}>{elem}</div>
                ))}
              </div>
            </div>
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
