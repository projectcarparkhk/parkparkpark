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
      type: 'localeSlug',
    },
    {
      name: 'district',
      title: 'District',
      type: 'reference',
      to: [{ type: 'district' }],
    },
    {
      name: 'isHot',
      title: 'Is Hot',
      type: 'boolean',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      subtitle: `district.name.${baseLanguage.id}`,
      media: 'image',
    },
  },
}
