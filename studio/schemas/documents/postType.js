import { defaultLanguage } from '../supportedLanguages'

export default {
  name: 'postType',
  title: 'Post type',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Display Name',
      type: 'localeString',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      name: 'shortDescription',
      title: 'Short description',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: `name.${defaultLanguage}`,
    },
  },
}
