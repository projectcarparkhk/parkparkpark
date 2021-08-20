import { CarparkResponse } from '../../types'
import { AreaResponse } from '../../types/AreaResponse'
import { TagFilterResponse } from '../../types/TagResponse'

export interface FilterSection {
  _id: string
  name: { [key: string]: string }
  subFilters: FilterOption[]
}

export interface FilterOption {
  _id: string
  name: { [key: string]: string }
}

export interface Filters {
  areas: FilterSection[]
  categories: FilterSection[]
}

export const structureFilters = (
  tagsFilterResponse: TagFilterResponse[],
  areaResponse: AreaResponse[]
) => {
  const categories: FilterSection = {
    name: {
      en: 'All',
      zh: '全部',
    },
    subFilters: tagsFilterResponse.map((tag) => ({ ...tag, checked: false })),
  }
  const areas: FilterSection[] = areaResponse.map(
    ({ _id, name, subDistricts }) => ({
      _id,
      name,
      subFilters: subDistricts.map((subDistrict) => ({
        ...subDistrict,
        checked: false,
      })),
    })
  )
  return { areas, categories: [categories] }
}

export const structureCarparks = (carparkResponse: CarparkResponse[]) => {
  return carparkResponse.map(({ name, subDistricts, tags }) => ({
    name,
    subDistricts,
    tags,
  }))
}
