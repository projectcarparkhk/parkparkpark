import { useState } from 'react';
import Container from '../components/container'
import Link from 'next/link'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Header from '../components/header'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllSubDistrictsGroupByArea } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Tabs from '../components/Tabs'
import TabNav from '../components/TabNav'
import TabNavItem from '../components/TabNavItem'

export default function Index({ allPosts, allAreas, preview }) {
  const [activeAreaId, setActiveAreaId] = useState(allAreas[0]._id)

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Header />
            <Tabs tabs={allAreas.map(a => ({
              ...a,
              label: a.name,
              panel: <div className="grid grid-cols-3 gap-4">
              {
                a.subDistricts.map(subDistrict => {
                  return (
                    <Link href={`/sub-districts/${subDistrict.slug}`}>
                      <div className='flex py-2 px-4 items-center justify-center bg-gray-100 rounded-lg cursor-pointer'>{subDistrict.name}</div>
                    </Link>
                  )
                })
              }
              </div>
            }))} 
            />
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

export async function getStaticProps({ preview = false}) {
  const allPosts = await getAllPostsForHome(preview)
  const allAreas = await getAllSubDistrictsGroupByArea()
  return {
    props: { allPosts, allAreas, preview },
    revalidate: 1
  }

}
