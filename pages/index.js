import { useState } from 'react';
import Container from '../components/container'
import Link from 'next/link'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllSubDistrictsGroupByArea } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
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
          <Intro />
          <div>
          {
            allAreas.map(area => {
              return (
                <TabNav>
                  <TabNavItem
                    id={area._id}
                    isActive={area._id === activeAreaId}
                    onClick={e => setActiveAreaId(e.target.getAttribute('data-tab-id'))}
                  >
                      {area.name}
                  </TabNavItem>
                </TabNav>
              )
            })
          }
          <div>
          {
            allAreas.find(a => a._id === activeAreaId).subDistricts.map(subDistrict => {
              return (
                <Link href={`/sub-districts/${subDistrict.slug}`}>
                  <div className='flex py-2 px-4 items-center justify-center bg-gray-100 rounded-lg'>{subDistrict.name}</div>
                </Link>
              )
            })
          }
          </div>
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

export async function getStaticProps({ preview = false}) {
  const allPosts = await getAllPostsForHome(preview)
  const allAreas = await getAllSubDistrictsGroupByArea()
  return {
    props: { allPosts, allAreas, preview },
    revalidate: 1
  }

}
