import { CarparkContextToday } from '../../types/pages'
import { PriceDetail } from '../../types/api/CarparkResponse'
import { CarparkResponse } from '../../types/pages'
import { TagFilterResponse } from '../../types/api/TagResponse'
import { FilterSection } from '../../types/components/filters'
import { AreaResponse } from '../../types/api/AreaResponse'

// Data transformation before going into applications
export const orderCarparkByPriceToday = (
  carparkResponse: CarparkResponse[]
): CarparkContextToday[] => {
  const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return carparkResponse
    .map(({ _id, tags, subDistricts, name, imagePath, priceDetails, slug }) => {
      return {
        _id,
        tags,
        subDistrict: subDistricts[0],
        name,
        imagePath: imagePath || '',
        slug: slug || '',
        priceDetail:
          (priceDetails?.find((item) => {
            const { day } = item
            const today = new Date().getDay()
            if (day === 'all') {
              return true
            } else if (day.includes('-')) {
              const [startDay, endDay] = day.split('-')
              return (
                today >= week.indexOf(startDay) && today <= week.indexOf(endDay)
              )
            } else {
              const dates = day.split(',')
              return dates.some((date) => date === week[today])
            }
          }) as PriceDetail) || null,
      }
    })
    .sort((a, b) => {
      if (!a.priceDetail || !b.priceDetail) {
        return 0
      }
      const aHr = parseInt((a.priceDetail as PriceDetail).hr)
      const aPrice = parseInt((a.priceDetail as PriceDetail).price)
      const bHr = parseInt((b.priceDetail as PriceDetail).hr)
      const bPrice = parseInt((b.priceDetail as PriceDetail).price)
      return aPrice / aHr - bPrice / bHr
    })
}

export const structureFilters = (
  tagsFilterResponse: TagFilterResponse[],
  areaResponse: AreaResponse[]
) => {
  const categories: FilterSection = {
    _id: 'all',
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
  return carparkResponse.map(({ _id, imagePath = '', name, subDistricts, tags }) => ({
    _id,
    imagePath,
    name,
    subDistricts,
    tags,
  }))
}
