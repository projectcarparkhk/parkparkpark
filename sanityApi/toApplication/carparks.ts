import { PriceDetail } from '../../types/api/CarparkResponse'
import { CarparkResponse } from '../../types/pages'
import { TagFilterResponse } from '../../types/api/TagResponse'
import { FilterSection } from '../../types/components/filters'
import { AreaResponse } from '../../types/api/AreaResponse'
import { isToday } from '../../utils/isToday'

// Data transformation before going into applications
export const orderCarparkByPriceToday = (
  carparkResponse: CarparkResponse[]
): CarparkResponse[] => {
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
        dayNightPriceDetails,
        descriptions,
        slug,
      }) => {
        return {
          _id,
          tags,
          subDistricts,
          name,
          imagePath,
          posts,
          descriptions,
          slug,
          paymentMethods,
          dayNightPriceDetails,
          priceDetails: priceDetails.filter((item) => {
            const { day } = item
            return isToday(day)
          }) as PriceDetail[],
        }
      }
    )
    .sort((a, b) => {
      if (
        !a ||
        !b ||
        !a.priceDetails ||
        !b.priceDetails ||
        !a.priceDetails[0] ||
        !b.priceDetails[0]
      ) {
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
  return carparkResponse.map(
    ({ _id, imagePath = '', name, subDistricts, tags, slug }) => ({
      _id,
      imagePath,
      name,
      subDistricts,
      tags,
      slug,
    })
  )
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

export const filterCarparksByPostSlug = (
  carparkResponse: CarparkResponse[],
  slug: string
) => {
  return carparkResponse.filter((carpark) =>
    carpark.posts.some((post) => post.slug === slug)
  )
}
