import { ResponseElement } from './ResponseElement'

export interface PostTranslation {
  shortDescription: string
  title: string
}

export interface PromotionDetail {
  time: string
  day: string
  hr: string
  condition?: string
  dining?: string
  movie?: string
  spending?: string
}

interface ExternalLink {
  title: { [key: string]: string }
  url: string
}
export interface PostResponse {
  _id: string
  _updatedAt: string
  _createdAt: string
  title: { [key: string]: string }
  shortDescription: { [key: string]: string }
  imagePath: string
  slug: string
  externalLinks?: ExternalLink[]
  isHot: boolean
  promotionDetails: PromotionDetail[]
  startAndExpiryDates?: {
    startDate: string
    expiryDate: string
  }
  tags: ResponseElement[]
  author?: ResponseElement & {
    bio: { [key: string]: string }
    imagePath: string
  }
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
