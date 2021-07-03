import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import CarparkBody from '../../components/carpark-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import CarparkHeader from '../../components/carpark-header'
import Comments from '../../components/comments'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllCarParksWithSlug, getCarparkAndMoreCarparks } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Link from 'next/link'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import Form from '../../components/form'

export default function Carpark({ carpark, name, slug, preview = false }) {
  const router = useRouter()
  if (!router.isFallback && !carpark?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Header />
      {
        router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {carpark.name}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <CarparkHeader
                title={carpark.name}
                coverImage={carpark.coverImage}
              />
              <CarparkBody content={carpark.body} />
            </article>
          </>
        )
      }
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getCarparkAndMoreCarparks(params.slug, preview)
  return {
    props: {
      preview,
      ...data,
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allCarParks = await getAllCarParksWithSlug()
  return {
    paths:
    allCarParks?.map((carpark) => ({
        params: {
          slug: carpark.slug,
        },
      })) || [],
    fallback: true,
  }
}
