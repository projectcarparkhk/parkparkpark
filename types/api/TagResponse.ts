import { ResponseElement } from './ResponseElement'
export interface HotTagResponse {
  _id: string
  en: TagTranslation
  zh: TagTranslation
  slug: string
  isHot: boolean
  imagePath: string
}

export interface TagTranslation {
  name: string
}

export interface TagFilterResponse {
  _id: string
  name: { [key: string]: string }
  slug: string
}

export interface TagResponse {
  _id: string
  name: { [key: string]: string }
  tags: ResponseElement[]
  slug: string
}
