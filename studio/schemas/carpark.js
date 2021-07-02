import { baseLanguage } from './localeString'

export default {
  name: 'carpark',
  title: 'Car Park',
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
      type: 'localeSlug'
    },
    {
      name: 'subDistrict',
      title: 'Sub District',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'subDistrict' } }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      media: 'mainImage'
    }
  }
}
