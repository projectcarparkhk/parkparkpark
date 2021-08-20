// Fix later:

import { CarparkResponse } from '../types'
import { SanityClient } from './sanity'


export async function getSubDistricts(
  preview: boolean
): Promise<any[]> {
  return SanityClient(preview).fetch(`*[_type == 'subDistrict']{
      'type': _type,
      name,
      slug
    }`)
}

export async function getCarparks(
  preview?: boolean
): Promise<CarparkResponse[]> {
  return SanityClient(preview)
    .fetch(`*[_type == 'carpark']{
      'type': _type,
      name,
      slug
    }`)
}
