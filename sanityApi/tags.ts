
import { HotTagResponse, TagFilterResponse } from "../types/api/TagResponse"
import { SanityClient } from "./sanity"

const tagFields = `
  _id,
  'imagePath': mainImage.asset._ref,
  'slug': slug.current,
  'en': {
    'name': name.en,
  },
  'zh': {
    'name': name.zh,
  }
`

export async function getHotTags(preview: boolean): Promise<HotTagResponse[]> {
  const result: HotTagResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'tag' && isHot == true]{
      ${tagFields}
    }
    `)
  return result
}

export async function getTags(preview: boolean): Promise<TagFilterResponse[]> {
  const categories = await SanityClient(preview)
  .fetch(`*[_type == 'tag']{
    _id, 
    name
  }`)
  return categories;
}