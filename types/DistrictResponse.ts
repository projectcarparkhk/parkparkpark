export interface SubDistrict {
    name: string;
    slug: string;
}

export interface DistrictResponse {
    _id: string;
    name: string;
    slug: string;
    subDistricts: SubDistrict[];
}