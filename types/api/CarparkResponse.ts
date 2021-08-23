import { ResponseElement } from './ResponseElement';
export interface PriceDetail {
  day: string
  hr: string
  price: string
  time: string
}

export interface CarparkResponse extends ResponseElement {
  imagePath: string
  name: { [key: string]: string }
  subDistricts: ResponseElement[]
  tags: ResponseElement[]
  priceDetails: PriceDetail[]
}

export interface CarparkContextToday extends ResponseElement {
  tags: ResponseElement[]
  subDistrict: ResponseElement
  imagePath: string
  priceDetail?: PriceDetail
}
