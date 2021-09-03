import { ResponseElement } from './ResponseElement'

export interface PostTranslation {
  shortDescription: string
  title: string
}

export interface PromotionDetail {
  condition: string
  day: string
  dining: string
  hr: string
  movie: string
  spending: string
  time: string
}

export interface PostResponse {
  _id: string
  _updatedAt: string
  _createdAt: string
  title: { [key: string]: string }
  shortDescription: { [key: string]: string }
  imagePath: string
  slug: string
  externalLink: string
  isHot: boolean
  promotionDetails: PromotionDetail[]
  startAndExpiryDates: {
    startDate: string
    endDate: string
  }
  tags: ResponseElement[]
  author: ResponseElement
  postType: ResponseElement
  body: { [key: string]: any }
}

export interface TranslatedPost {
  _id: string
  shortDescription: string
  title: string
  imagePath: string
  slug: string
}
