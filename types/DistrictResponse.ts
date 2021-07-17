export interface SubDistrict {
    name: string;
    slug: string;
    isHot: boolean
}

export interface DistrictResponse {
    _id: string;
    name: string;
    slug: string;
    subDistricts: SubDistrict[];
}