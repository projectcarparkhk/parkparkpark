// Fix later:

import { DistrictResponse } from "../types"
import { SanityClient } from "./sanity"

// It should be subDistrict group by area, area: HK / KLN / NT
export async function getSubDistrictsGroupByArea(
  preview: boolean,
  locale = 'zh'
): Promise<DistrictResponse[]> {
  const result: DistrictResponse[] = await SanityClient(preview)
    .fetch(`*[_type == 'area']{
      _id, 
      'name': name.${locale},
      'slug': slug.${locale}Slug.current,
      'subDistricts': *[_type == 'subDistrict' && references(^._id)]{
        'name': name.${locale}, 
        'slug': slug.${locale}Slug.current,
        'isHot': isHot,
      }
    }`)
  return result
}

export async function getSubDistricts(preview: boolean): Promise<DistrictResponse[]> {
    return SanityClient(preview).fetch(`*[_type == 'subDistrict']{
      'type': _type,
      name,
      slug
    }`)
  }
