import { PriceDetail } from '../../types/api/CarparkResponse'
import { CarparkResponse } from '../../types/pages'
import { TagFilterResponse } from '../../types/api/TagResponse'
import { FilterSection } from '../../types/components/filters'
import { AreaResponse } from '../../types/api/AreaResponse'

// Data transformation before going into applications
export const orderCarparkByPriceToday = (
  carparkResponse: CarparkResponse[]
): CarparkResponse[] => {
  const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return carparkResponse
    .map(
      ({
        _id,
        tags,
        posts,
        subDistricts,
        paymentMethods,
        name,
        imagePath,
        priceDetails,
        descriptions,
        slug,
      }) => {
        return {
          _id,
          tags: tags || [],
          subDistricts: subDistricts || [],
          name,
          imagePath: imagePath || [],
          posts: posts || [],
          descriptions: descriptions || '',
          slug: slug || '',
          paymentMethods: paymentMethods || [],
          priceDetails: priceDetails ? 
            [
              priceDetails?.find((item) => {
                const { day } = item
                const today = new Date().getDay()
                if (day === 'all') {
                  return true
                } else if (day.includes('-')) {
                  const [startDay, endDay] = day.split('-')
                  return (
                    today >= week.indexOf(startDay) &&
                    today <= week.indexOf(endDay)
                  )
                } else {
                  const dates = day.split(',')
                  return dates.some((date) => date === week[today])
                }
              }) as PriceDetail,
            ] : [],
        }
      }
    )
    .sort((a, b) => {
      if (!a || !b || !a.priceDetails || !b.priceDetails || !a.priceDetails[0] || !b.priceDetails[0]) {
        return 0
      }
      const aHr = parseInt((a.priceDetails[0] as PriceDetail).hr)
      const aPrice = parseInt((a.priceDetails[0] as PriceDetail).price)
      const bHr = parseInt((b.priceDetails[0] as PriceDetail).hr)
      const bPrice = parseInt((b.priceDetails[0] as PriceDetail).price)
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
  return carparkResponse.map(({ _id, name, subDistricts, tags }) => ({
    _id,
    name,
    subDistricts,
    tags,
  }))
}

export const getNearbyCarparks = (
  carparkResponse: CarparkResponse[],
  carpark: CarparkResponse
) => {
  const subDistrictIds = carpark.subDistricts.map((sub) => sub._id)
  // return carparkResponse
  return carparkResponse.filter((response) =>
    subDistrictIds.includes(response.subDistricts[0]._id)
  )
  // return carparkResponse.filter((response) => subDistrictIds.includes(response.subDistricts[0]._id) && carpark._id !==response._id)
}
