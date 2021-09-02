import { SupportedLanguages } from '../constants/SupportedLanguages'
import { imageBuilder } from '../sanityApi/sanity'
import { PostResponse } from '../types/pages'

export const translatePosts = (
  posts: PostResponse[],
  locale: SupportedLanguages
) =>
  posts.map((post) => {
    const { _id, slug, imagePath, title, shortDescription } = post
    return {
      _id,
      slug,
      title: title[locale],
      shortDescription: shortDescription[locale],
      imagePath: imageBuilder(imagePath).toString() || '/hk.webp',
    }
  })
