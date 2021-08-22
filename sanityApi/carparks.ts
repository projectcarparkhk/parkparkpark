import { CarparkResponse } from '../types'
import { SanityClient } from './sanity'

const carparkFields = `
  _id, 
  'imagePath': mainImage.asset._ref,
  'slug': slug.current,
  'name': {
    'en': name.en,
    'zh': name.zh
  },
  'subDistricts': subDistrict[] -> {
    _id,
    'name': {
      'en': name.en,
      'zh': name.zh,
    },
    'slug': slug.current
  },
  'tags': tag[] -> {
    _id,
    'name': {
      'en': name.en,
      'zh': name.zh,
    },
    'slug': slug.current
  },
  'priceDetails': priceDetails.rows[1...10]{
    'day': cells[0],
    'time': cells[1],
    'price': cells[2],
    'hr': cells[3]
  }
`

export async function getCarparks(
  preview?: boolean
): Promise<CarparkResponse[]> {
  return SanityClient(preview)
    .fetch(`*[_type == 'carpark'] | order(publishedAt desc){
      ${carparkFields}
    }`)
}
