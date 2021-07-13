
import { PostResponse, DistrictResponse } from '../types'
import client, { previewClient } from './sanity'

const getUniquePosts = (posts: PostResponse[]) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

const postFields = `
  _id,
  name,
  title,
  'date': publishedAt,
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url},
`

const getClient = (preview: boolean) => (preview ? previewClient : client)

// export async function getPreviewPostBySlug(slug) {
//   const data = await getClient(true).fetch(
//     `*[_type == 'post' && slug.current == $slug] | order(publishedAt desc){
//       ${postFields}
//       body
//     }`,
//     { slug }
//   )
//   return data[0]
// }

// export async function getAllPostsWithSlug() {
//   const data = await client.fetch(`*[_type == 'post']{ 'slug': slug.current }`)
//   return data
// }

export async function getPostsForHome(preview: boolean): Promise<PostResponse[]> {
  const results: PostResponse[] = await getClient(preview)
    .fetch(`*[_type == 'post'] | order(publishedAt desc){
      ${postFields}
    }`)
  return getUniquePosts(results)
}

// export async function getPostAndMorePosts(slug: string, preview: boolean) {
//   const curClient = getClient(preview)
//   const [post, morePosts] = await Promise.all([
//     curClient
//       .fetch(
//         `*[_type == 'post' && slug.current == $slug] | order(_updatedAt desc) {
//         ${postFields}
//         body,
//         'comments': *[
//                       _type == 'comment' && 
//                       post._ref == ^._id && 
//                       approved == true] {
//           _id, 
//           name, 
//           email, 
//           comment, 
//           _createdAt
//         }
//       }`,
//         { slug }
//       )
//       .then((res) => res?.[0]),
//     curClient.fetch(
//       `*[_type == 'post' && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
//         ${postFields}
//         body,
//       }[0...2]`,
//       { slug }
//     ),
//   ])
//   return { post, morePosts: getUniquePosts(morePosts) }
// }

export async function getSubDistrictsGroupByDistrict(locale = 'zh'): Promise<DistrictResponse[]> {
  const result: DistrictResponse[] = await client.fetch(`*[_type == 'district']{
    _id, 
    'name': name.${locale},
    'slug': slug.${locale}Slug.current,
    'subDistricts': *[_type == 'subDistrict' && references(^._id)]{
      'name': name.${locale}, 
      'slug': slug.${locale}Slug.current,
      'isHot': isHot,
    }
  }`)
  return result;
}

// export async function getAllSubDistrictsWithSlug(locale = 'zh', subDistrict) {
//   const data = await getClient(true).fetch(`*[_type == 'subDistrict']{
//     _id, 
//     'name': name.${locale},
//     'slug': slug.${locale}Slug.current
//   }`)
//   return data
// }

// export async function getAllCarParks(slug, preview, locale = 'zh') {
//   const data = await client.fetch(
//     `*[_type == 'subDistrict' && slug.${locale}Slug.current == $slug]{
//     _id, 
//     'name': name.${locale},
//     'slug': slug.${locale}Slug.current,
//     'carparks':*[_type == 'carpark' && references(^._id)]{
//       'name': name.${locale},
//       'coverImage': mainImage,
//       'slug': slug.${locale}Slug.current
//     }
//   }`,
//     { slug }
//   )
//   return data[0]
// }

// export async function getAllCarParksWithSlug(locale = 'zh') {
//   const data = await client.fetch(`*[_type == 'carpark']{
//     _id, 
//     'name': name.${locale},
//     'slug': slug.${locale}Slug.current,
//     'coverImage': mainImage
//   }`)
//   return data
// }

// export async function getCarparkAndMoreCarparks(slug, preview, locale = 'zh') {
//   const curClient = getClient(preview)
//   const [carpark, moreCarparks] = await Promise.all([
//     curClient
//       .fetch(
//         `*[_type == 'carpark' && slug.${locale}Slug.current == $slug] {
//           _id, 
//           'name': name.${locale},
//           'slug': slug.${locale}Slug.current,
//           'coverImage': mainImage,
//           body
//       }`,
//         { slug }
//       )
//       .then((res) => res?.[0]),
//     curClient.fetch(
//       `*[_type == 'carpark' && slug.${locale}Slug.current != $slug] {
//         _id, 
//         'name': name.${locale},
//         'slug': slug.${locale}Slug.current,
//         body,
//       }[0...2]`,
//       { slug }
//     ),
//   ])
//   return { carpark, moreCarparks }
// }
