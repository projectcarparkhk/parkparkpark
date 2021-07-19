import { baseLanguage } from './localeString'

export default {
  name: 'category',
  title: 'Category',
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
      name: 'isHot',
      title: 'Is Hot',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
    },
  },
}
