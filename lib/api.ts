
import { PostResponse, DistrictResponse, TagResponse } from '../types'
import {SanityClient} from './sanity'

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

// export async function getPreviewPostBySlug(slug) {
//   const data = await SanityClient(true).fetch(
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


// export async function getPostAndMorePosts(slug: string, preview: boolean) {
//   const curClient = SanityClient(preview)
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



export async function getHotTags(preview: boolean, locale = 'zh'): Promise<TagResponse[]> {
  const result: TagResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'tag']{
      'name': name.${locale},
      'slug': slug.${locale}Slug.current,
    }`)
  return result
}

// Fix later: 
// It should be subDistrict group by area, area: HK / KLN / NT
export async function getSubDistrictsGroupByDistrict(preview: boolean, locale = 'zh'): Promise<DistrictResponse[]> {
  const result: DistrictResponse[] = await SanityClient(preview)
  .fetch(`*[_type == 'district']{
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

// export async function getCarparks(): Promise<DistrictResponse[]> {
//   return client.fetch(`*[_type == 'carpark']{
//     'type': _type,
//     name,
//     slug
//   }`)
// }

// export async function getSubDistricts(): Promise<DistrictResponse[]> {
//   return client.fetch(`*[_type == 'subDistrict']{
//     'type': _type,
//     name,
//     slug
//   }`)
// }
// export async function getAllSubDistrictsWithSlug(locale = 'zh', subDistrict) {
//   const data = await SanityClient(true).fetch(`*[_type == 'subDistrict']{
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
//   const curClient = SanityClient(preview)
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
