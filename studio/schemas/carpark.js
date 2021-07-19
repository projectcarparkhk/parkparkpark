import { baseLanguage } from './localeString'

export default {
  name: 'carpark',
  title: 'Carpark',
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
      type: 'localeSlug',
    },
    {
      name: 'subDistrict',
      title: 'Sub District',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'subDistrict' } }],
      options: {
        layout: 'tags',
      },
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
      name: 'tag',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'localeBlockContent',
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      media: 'mainImage',
    },
  },
}
