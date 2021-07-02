import Container from '../components/container'
import Link from 'next/link'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllSubDistrictsGroupByArea } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

export default function Index({ allPosts, allAreas, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          <div class='flex flex-row'>
          {
            allAreas.map(area => {
              return (
                <>
                <div class='font-semibold py-2 px-4'>{area.name}</div>
                <div class='grid grid-cols-3 gap-4'>
                {area.subDistricts.map(subDistrict => {
                  console.log(subDistrict)
                  return (
                    <Link href={`/sub-district/${subDistrict.slug.zhSlug.current}`}>
                      <div class='flex py-2 px-4 items-center justify-center bg-gray-100 rounded-lg'>{subDistrict.name.zh}</div>
                    </Link>
                  )
                })}
                </div>
                </>
              )
            })
          }
          </div>
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )} */}
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, locale = 'zh' }) {
  const allPosts = await getAllPostsForHome(preview)
  const allAreas = await getAllSubDistrictsGroupByArea(locale)
  return {
    props: { allPosts, allAreas, preview },
    revalidate: 1
  }

}
