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
    },
    'iconPath': icon.asset._ref
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
const defaultValues: CarparkResponse = {
  imagePath: [],
  name: {},
  subDistricts: [],
  tags: [],
  priceDetails: [],
  descriptions: {},
  paymentMethods: [],
  posts: [],
  slug: '',
  _id: 'default',
}

export async function getCarparks(
  preview?: boolean
): Promise<CarparkResponse[]> {
  const carparks: CarparkResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'carpark'] | order(publishedAt desc){
      ${carparkFields}
    }`)
  return carparks.map((carpark) => ({
    ...defaultValues,
    ...carpark,
  }))
}

export async function getCarparkBySlug(
  slug: string,
  preview?: boolean
): Promise<CarparkResponse> {
  const carpark = await SanityClient(preview)
    .fetch(`*[_type == 'carpark' && slug.current == '${slug}'] | order(publishedAt desc)[0]{
    ${carparkFields}
  }`)
  return {
    ...defaultValues,
    ...carpark,
  }
}

export async function getNearbyCarparks(
  subDistrictIds: string[],
  preview?: boolean
): Promise<CarparkResponse[]> {
  const carparks: CarparkResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'carpark' && (subDistrict[]->_id)[@ in [${subDistrictIds.map(
    (id) => `'${id}'`
  )}]] ]| order(publishedAt desc){
      ${carparkFields}
    }`)

  return carparks.map((carpark) => ({
    ...defaultValues,
    ...carpark,
  }))
}
