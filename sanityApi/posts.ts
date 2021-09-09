import { PostResponse } from '../types/pages'
import { SanityClient } from './sanity'

const postFields = `
  _id,
  _updatedAt,
  _createdAt,
  'imagePath': mainImage.asset._ref,
  'slug': slug.current,
  'title': {
    'en': title.en,
    'zh': title.zh,
  },
  'author': author -> {
    _id,
    'imagePath': mainImage.asset._ref,
    'name': {
      'en': name.en,
      'zh': name.zh
    },
    'bio': {
      'en': bio.en,
      'zh': bio.zh
    },
    'slug': slug.current
  },
  'postType': postType -> {
    _id,
    'name': {
      'en': name.en,
      'zh': name.zh
    },
    'slug': slug.current
  },
  'shortDescription': {
    'en': shortDescription.en,
    'zh': shortDescription.zh
  },
  isHot,
  'externalLinks': externalLinks[]{
    'title': {
      'en': title.en,
      'zh': title.zh
    },
    url

  },
  'promotionDetails': promotionDetails.rows[1...40]{
    'day': cells[0],
    'time': cells[1],
    'hr': cells[2],
    'spending': cells[3],
    'dining': cells[4],
    'movie': cells[5],
    'condition': cells[6],
  },
  'startAndExpiryDates': {
    'startDate': startAndExpiryDates.startDate,
    'expiryDate': startAndExpiryDates.expiryDate
  },
  'tags': tag[] -> {
    _id,
    'name': {
      'en': name.en,
      'zh': name.zh,
    },
    'slug': slug.current
  },
  'body': {
    'zh': body.zh,
    'en': body.en
  }
`

const defaultValues: PostResponse = {
  _id: 'default-id',
  _updatedAt: '',
  _createdAt: '',
  title: { en: '', zh: '' },
  shortDescription: { en: '', zh: '' },
  imagePath: '',
  slug: '',
  isHot: false,
  tags: [],
  postType: { name: { en: '', zh: '' }, _id: 'default-id', slug: '' },
  body: { en: '', zh: '' },
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

export async function getAllPosts(preview?: boolean): Promise<PostResponse[]> {
  const posts: PostResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'post'] | order(publishedAt desc){
      ${postFields}
    }`)
  return posts.map((post) => ({
    ...defaultValues,
    ...post,
  }))
}

export async function getPostBySlug(
  slug: string,
  preview?: boolean
): Promise<PostResponse> {
  const post: PostResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'post' && slug.current == '${slug}'] | order(publishedAt desc)[0]{
      ${postFields}

    }`)
  return {
    ...defaultValues,
    ...post,
  }
}
