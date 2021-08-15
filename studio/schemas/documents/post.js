import { defaultLanguage } from '../supportedLanguages'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
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
    {
      name: 'startAndExpiryDates',
      title: 'Start and expiry dates',
      type: 'startAndExpiryDates',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Promotion details',
      name: 'promotionDetails',
      type: 'localeTable',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'localeBlockContent',
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      name: 'isHot',
      title: 'Is Hot',
      type: 'boolean',
    },
    {
      name: 'externalLink',
      title: 'External link',
      type: 'url',
    },
    {
      name: 'infoTables',
      title: 'Info tables',
      type: 'array',
      of: [
        {
          title: 'Info table',
          type: 'object',
          fields: [
            {
              name: 'infoTable',
              title: 'Info table',
              type: 'localeTable',
            },
          ],
        },
      ],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
  ],

  preview: {
    select: {
      title: `title.${defaultLanguage}`,
      author: `author.name.${defaultLanguage}`,
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      }
    },
  },
}
