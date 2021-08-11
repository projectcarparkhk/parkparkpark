import { PostResponse } from './PostResponse'
import { Carpark } from './Carpark'
import { DistrictResponse } from './DistrictResponse'
import { TagResponse } from './TagResponse'

type FilterResponse = {
    tags: any
    subDistricts: any
} 

export type { FilterResponse, PostResponse, Carpark, DistrictResponse, TagResponse }