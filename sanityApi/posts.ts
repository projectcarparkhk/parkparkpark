
import { PostResponse } from '../types/pages'
import {SanityClient} from './sanity'

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

export async function getLatestPosts(preview?: boolean): Promise<PostResponse[]> {
  return SanityClient(preview)
    .fetch(`*[_type == 'post'] | order(publishedAt desc)[0..7]{
      ${postFields}
    }`)
}

export async function getHotPosts(preview?: boolean): Promise<PostResponse[]> {
  return SanityClient(preview)
    .fetch(`*[_type == 'post' && isHot == true] | order(publishedAt desc)[0..7]{
      ${postFields}
    }`)
}

