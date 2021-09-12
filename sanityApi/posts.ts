import { PostResponse } from '../types/pages'
import { getNearbyCarparks } from './carparks'
import { postFields } from './constants'
import { SanityClient } from './sanity'

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
  promotionDetails: [],
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

export async function getNearbyPosts(
  subDistricts: string[],
  preview?: boolean
): Promise<PostResponse[]> {
  const carparks = await getNearbyCarparks(subDistricts)
  const nearbyPosts = carparks.map(({ posts }) => posts)
  return nearbyPosts.flat().map((post) => ({
    ...defaultValues,
    ...post,
  }))
}
