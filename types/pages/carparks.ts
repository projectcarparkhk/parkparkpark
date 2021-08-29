export interface TranslatedCarpark {
  _id: string
  title: string
  tags: { label: string }[]
  location: string
  imagePath: string
  shortDescription: string
  slug: string
}

export interface CarparkPostField {
  day: any
  hr: any
  time: any
}
