import { PostResponse, PromotionDetail } from './PostResponse'
import { ResponseElement } from './ResponseElement'
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
  dayNightPriceDetails: PriceDetail[]
  descriptions: { [key: string]: string }
  paymentMethods: {
    name: { [key: string]: string }
    iconPath: string
  }[]
  posts: PostResponse[]
}
