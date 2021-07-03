import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import List from '../../components/List'
import ListItem from '../../components/ListItem'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllSubDistrictsWithSlug, getAllCarParks } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Link from 'next/link'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import Form from '../../components/form'

export default function SubDistrict({ name, slug, carparks, preview = false }) {
  const router = useRouter()
  if (!router.isFallback && !slug) {
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
                  {name}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>

              <h1>{name}</h1>
              <List>
                {
                  carparks?.map(carpark => {
                    return (
                      <ListItem
                          title={carpark.name}
                          link={`/carparks/${carpark.slug}`}
                          coverImage={carpark.coverImage}
                          date={carpark.date}
                          slug={carpark.slug}
                          excerpt={carpark.excerpt}
                        />
                    )
                  })
                }
              </List>
              {/* <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.body} /> */}
            </article>
          </>
        )
      }
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getAllCarParks(params.slug, preview)
  return {
    props: {
      preview,
      ...data,
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allSubdistricts = await getAllSubDistrictsWithSlug()
  return {
    paths:
      allSubdistricts?.map((subDistrict) => ({
        params: {
          slug: subDistrict.slug,
        },
      })) || [],
    fallback: true,
  }
}
