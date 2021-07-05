import { baseLanguage } from './localeString'

export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Display Name',
      type: 'localeString',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`
    },
  },
}
