import { CarparkResponse } from '../types'
import { SanityClient } from './sanity'

const carparkFields = `
  _id,
  'imagePath': mainImage.asset._ref,
  'slug': slug.current,
  'en': {
    'name': name.en,
    'subDistrict': subDistrict[0]->{'name': name.en},
    'tag': tag[0..1]->{'name':name.en}
  },
  'zh': {
    'name': name.zh,
    'subDistrict': subDistrict[0]->{'name': name.zh},
    'tag': tag[0..1]->{'name':name.zh}
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
