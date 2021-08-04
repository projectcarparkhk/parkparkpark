import { defaultLanguage } from "../supportedLanguages"

export default {
  name: 'post',
  title: 'Post',
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
      type: 'table',
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
      name: 'carpark',
      title: 'Carpark',
      type: 'reference',
      to: {type: 'carpark'}
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
              name: 'tableName',
              title: 'Table name',
              type: 'localeString',
            },
            {
              title: 'Table',
              name: 'table',
              type: 'table',
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
      title: 'title',
      author: `author.name.${defaultLanguage}`,
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
