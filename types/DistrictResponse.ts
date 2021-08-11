import { SimpleLink } from "./common"
export interface SubDistrict extends SimpleLink {
    isHot?: boolean
}

export interface DistrictResponse extends SubDistrict {
    subDistricts: SubDistrict[];
}
export interface Area extends SubDistrict {
    subDistricts: SubDistrict[];
}