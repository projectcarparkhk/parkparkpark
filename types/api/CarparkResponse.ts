import { ResponseElement } from './ResponseElement';
export interface PriceDetail {
  day: string
  hr: string
  price: string
  time: string
}

// define types and only take what matters for the component in the transformation section
export interface CarparkResponse extends ResponseElement {
  imagePath: string[]
  name: { [key: string]: string }
  subDistricts: ResponseElement[]
  tags: ResponseElement[]
  priceDetails: PriceDetail[]
  descriptions: { [key: string]: string }
  paymentMethods: {
    name: { [key: string]: string }
  }
  posts: {
    title: { [key: string]: string }
    slug: string
    shortDescription: { [key: string]: string },
    imagePath: string
  }[]

}

export interface CarparkContextToday extends ResponseElement {
  tags: ResponseElement[]
  subDistrict: ResponseElement
  imagePath: string
  priceDetail?: PriceDetail
}
