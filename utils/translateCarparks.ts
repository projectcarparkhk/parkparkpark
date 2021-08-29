import {
  durationTranslations,
  SupportedLanguages,
} from '../constants/SupportedLanguages'
import { imageBuilder } from '../sanityApi/sanity'
import { CarparkResponse } from '../types/pages'

export const translateCarparks = (
  carparks: CarparkResponse[],
  locale: SupportedLanguages
) =>
  carparks.map((carpark) => {
    const { priceDetails, _id, imagePath, slug, tags, subDistricts, name } =
      carpark
    const shortDescription = priceDetails && priceDetails[0]
      ? `$${priceDetails[0].price} / ${
          durationTranslations[
            priceDetails[0].hr as keyof typeof durationTranslations
          ][locale]
        }`
      : ''
    return {
      _id,
      title: name[locale],
      tags: tags.map((tag) => ({ label: tag.name[locale] })),
      location: subDistricts[0].name[locale],
      imagePath: imageBuilder(imagePath[0]).toString() || '/hk.webp',
      shortDescription,
      slug,
    }
  })
