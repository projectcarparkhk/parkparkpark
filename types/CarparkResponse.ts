export interface Tag {
  name: string
}

export interface PriceDetail {
  day: string
  hr: string
  price: string
  time: string
}

export interface SubDistrict {
  name: string
}

export interface CarparkTranslation {
  name: string
  tag: Tag[]
  subDistrict: SubDistrict
}

export interface CarparkResponse {
  _id: string
  imagePath: string
  slug: string
  name: { [key: string]: string }
  subDistricts: { _id: string; name: { [key: string]: string } }[]
  tags: { _id: string; name: { [key: string]: string } }[]
  priceDetails: PriceDetail[]
}

export interface CarparkContextToday {
  _id: string
  en: CarparkTranslation
  imagePath: string
  priceDetail?: PriceDetail
  zh: CarparkTranslation
  slug: string
}

export interface TranslatedCarpark {
  _id: string
  title: string
  tags: { label: string }[]
  location: string
  imagePath: string
  shortDescription: string
  slug: string
}
