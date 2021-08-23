
import { PostResponse } from "../types/pages"
import {SanityClient} from "./sanity"

const postFields = `
  _id,
  'imagePath': mainImage.asset._ref,
  'slug': slug.current,
  'en' : {
    'title': title.en,
    'shortDescription': shortDescription.en
  },
  'zh' : {
    'title': title.zh,
    'shortDescription': shortDescription.zh
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
