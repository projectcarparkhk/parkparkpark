import { ResponseElement } from "./ResponseElement";

export interface AreaResponse {
  _id: string
  name: { [key: string]: string }
  subDistricts: ResponseElement[]
  slug: string
}


