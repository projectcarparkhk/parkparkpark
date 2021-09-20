import { CarparkResponse } from '../types/pages'
import { SanityClient } from './sanity'
import { carparkFields } from './constants'

const defaultValues: CarparkResponse = {
  imagePath: [],
  name: {},
  subDistricts: [],
  tags: [],
  priceDetails: [],
  dayNightPriceDetails: [],
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
