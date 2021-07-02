import { baseLanguage } from './localeString'

export default {
  name: 'subDistrict',
  title: 'Sub District',
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
      name: 'area',
      title: 'Area',
      type: 'reference',
      to: [
        { type: 'area'}
      ]
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      subtitle: `area.name.${baseLanguage.id}`, 
      media: 'image'
    }
  }
}
