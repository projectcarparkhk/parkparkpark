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
  subDistricts: { _id: string; name: { [key: string]: string }, slug: string }[]
  tags: { _id: string; name: { [key: string]: string }, slug: string }[]
  priceDetails: PriceDetail[]
}

export interface CarparkContextToday {
  _id: string
  tags: { _id: string; name: { [key: string]: string } }[]
  subDistrict: { _id: string; name: { [key: string]: string } }
  name: { [key: string]: string }
  imagePath: string
  priceDetail?: PriceDetail
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
