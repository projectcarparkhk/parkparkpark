import { baseLanguage } from '../components/localeString'
import { defaultLanguage } from '../supportedLanguages'

export default {
  name: 'subDistrict',
  title: 'Sub-district',
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
      name: 'area',
      title: 'Area',
      type: 'reference',
      to: [{ type: 'area' }],
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
      title: `name.${defaultLanguage}`,
      subtitle: `district.name.${defaultLanguage}`,
      media: 'image',
    },
  },
}
