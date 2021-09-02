import { PostResponse } from '../types/pages'
import { SanityClient } from './sanity'

const postFields = `
  _id,
  'imagePath': mainImage.asset._ref,
  'slug': slug.current,
  'title': {
    'en': title.en,
    'zh': title.zh,
  },
  'shortDescription': {
    'en': shortDescription.en,
    'zh': shortDescription.zh
  }
`

const defaultValues = {
  _id: 'default-id',
  title: {},
  shortDescription: {},
  imagePath: '',
  slug: '',
}

export async function getLatestPosts(
  preview?: boolean
): Promise<PostResponse[]> {
  const posts: PostResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'post'] | order(publishedAt desc)[0..7]{
      ${postFields}
    }`)
  return posts.map((post) => ({
    ...defaultValues,
    ...post,
  }))
}

export async function getHotPosts(preview?: boolean): Promise<PostResponse[]> {
  const posts: PostResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'post' && isHot == true] | order(publishedAt desc)[0..7]{
      ${postFields}
    }`)
  return posts.map((post) => ({
    ...defaultValues,
    ...post,
  }))
}
