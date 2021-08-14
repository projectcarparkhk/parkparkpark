import { TagResponse } from '../types'
import { SanityClient } from './sanity'

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

export async function getHotTags(preview: boolean): Promise<TagResponse[]> {
  const result: TagResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'tag' && isHot == true]{
      ${tagFields}
    }
    `)
  return result
}
