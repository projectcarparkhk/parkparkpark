export interface SubDistrict {
    _id: string;
    name: string;
    slug: string;
    isHot?: boolean
}

export interface DistrictResponse extends SubDistrict {
    subDistricts: SubDistrict[];
}
export interface Area extends SubDistrict {
    subDistricts: SubDistrict[];
}