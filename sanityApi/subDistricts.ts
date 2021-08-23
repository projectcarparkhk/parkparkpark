// Fix later:

import { AreaResponse } from "../types/api/AreaResponse"
import { SanityClient } from "./sanity"

// It should be subDistrict group by area, area: HK / KLN / NT
export async function getSubDistrictsGroupByArea(
  preview: boolean,
): Promise<AreaResponse[]> {
  const result: AreaResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'area']{
      _id, 
      'name': {
        'en': name.en,
        'zh': name.zh
      },
      'slug': slug.current,
      'subDistricts': *[_type == 'subDistrict' && references(^._id)]{
        _id,
        'name': {
          'en': name.en,
          'zh': name.zh
        },
        'slug': slug.current
      }
    }`)
  return result
}

export async function getSubDistricts(preview: boolean): Promise<any[]> {
    return SanityClient(preview).fetch(`*[_type == 'subDistrict']{
      'type': _type,
      name,
      slug
    }`)
  }
