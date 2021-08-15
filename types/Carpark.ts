import { SubDistrict } from './DistrictResponse';
import { TagResponse } from './TagResponse';
import { SimpleLink } from './common'

export interface Carpark extends SimpleLink {
    isHot?: boolean;
    subDistricts: SubDistrict[];
    tags: TagResponse[];
}