import { CarparkResponse } from '../types/pages'
import { SanityClient } from './sanity'

const carparkFields = `
  _id, 
  'imagePath': [mainImage.asset._ref, gateImage.asset._ref],
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
  'descriptions': {
    'en': descriptions.en,
    'zh': descriptions.zh,
  },
  'priceDetails': priceDetails.rows[1...10]{
    'day': cells[0],
    'time': cells[1],
    'price': cells[2],
    'hr': cells[3]
  },
  'paymentMethods': paymentMethods[] -> {
    'name': {
      'en': name.en,
      'zh': name.zh
    }
  },
  'posts': posts[] -> {
    'title': {
      'en': title.en,
      'zh': title.zh
    },
    'slug': slug.current,
    'shortDescription': {
      'en': shortDescription.en,
      'zh': shortDescription.zh
    },
    'imagePath': mainImage.asset._ref,
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

export async function getCarparkBySlug(
  slug: string, preview?: boolean,
): Promise<CarparkResponse> {
  return SanityClient(preview)
    .fetch(`*[_type == 'carpark' && slug.current == '${slug}'] | order(publishedAt desc)[0]{
      ${carparkFields}
    }`)
}
