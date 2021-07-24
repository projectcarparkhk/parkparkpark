import { baseLanguage } from './localeString'

export default {
  name: 'tag',
  title: 'Tag',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
    },
    {
      name: 'isHot',
      title: 'Is Hot',
      type: 'boolean',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
    },
  },
}
