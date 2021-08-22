import { SimpleLink } from '../common'
export interface SubDistrict extends SimpleLink {
    isHot?: boolean
}

export interface DistrictResponse extends SubDistrict {
    subDistricts: SubDistrict[];
}
export interface Area extends SubDistrict {
    subDistricts: SubDistrict[];
}


export interface FilterOption {
    _id: string
    name: string
    slug: string
    isHot?: boolean
    checked?: boolean
    [key: string]: any
}

// export interface Area {
//     subDistricts: FilterOption[];
//     [key: string]: any
// }
