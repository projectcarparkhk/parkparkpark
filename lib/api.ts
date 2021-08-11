
import { PostResponse, DistrictResponse, TagResponse } from '../types'
import { Carpark } from '../types/Carpark'
import { SubDistrict } from '../types/DistrictResponse'
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



export async function getHotTags(preview: boolean, locale = 'zh'): Promise<TagResponse[]> {
  const result: TagResponse[] = await getClient(preview)
    .fetch(`*[_type == 'tag']{
      'name': name.${locale},
      'slug': slug.${locale}Slug.current,
    }`)
  return result
}

// Fix later: 
// It should be subDistrict group by area, area: HK / KLN / NT
export async function getSubDistrictsGroupByArea(preview: boolean, locale = 'zh'): Promise<DistrictResponse[]> {
  const result: DistrictResponse[] = await getClient(preview)
  .fetch(`*[_type == 'area']{
    _id, 
    'name': name.${locale},
    'slug': slug.current,
    'subDistricts': *[_type == 'subDistrict' && references(^._id)]{
      'name': name.${locale}, 
      'slug': slug.current,
      'isHot': isHot,
    }
  }`)
  return result;
}

export async function getCarparks(preview: boolean, locale = 'zh'): Promise<Carpark[]> {
  const result: Carpark[] = await getClient(preview)
  .fetch(`*[_type == 'carpark']{
    _id, 
    'name': name.${locale},
    'slug': slug.current,
    'subDistricts': subDistrict[] -> { 
      'name': name.${locale},
      isHot
    },
    'tags': tag[] -> { 
      'name': name.${locale},
      isHot
    },
  }`)
  return result;
}

export async function getFilters(preview: boolean, locale = 'zh'): Promise<TagResponse[]> {
  const tags: TagResponse[] = await getClient(preview)
  .fetch(`*[_type == 'tag']{
    _id, 
    'name': name.${locale},
    'slug': slug.current
  }`)
  const subDistricts: SubDistrict[] = await getClient(preview)
  .fetch(`*[_type == 'subDistrict']{
    _id, 
    'name': name.${locale},
    'slug': slug.current
  }`)
  const filter = {
    subDistricts: {},
    tags: {}
  }

  for (const subDistrict of subDistricts) {
    filter.subDistricts[subDistrict.name] = false
  }

  for (const tag of tags) {
    filter.tags[tag.name] = false
  }

  
  return filter
}

export async function getSubDistricts(): Promise<DistrictResponse[]> {
  return client.fetch(`*[_type == 'subDistrict']{
    'type': _type,
    name,
    slug
  }`)
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
