import { SanityClient } from './sanity'
import { getSubDistrictsGroupByArea } from './subDistricts'
import { FilterResponse } from '../types/FilterResponse'

export async function getFilters(preview: boolean, locale = 'zh'): Promise<FilterResponse> {
  const tags = await SanityClient(preview)
  .fetch(`*[_type == 'tag']{
    _id, 
    'name': name.${locale},
    'slug': slug.current
  }`)

  const areas = await getSubDistrictsGroupByArea(preview, locale = 'zh')
  // Mock category for tags
  const categories = [{
    _id: 'all',
    name: '全部',
    slug: 'all',
    tags
  }]

  return {
    areas,
    categories,
  }
}
