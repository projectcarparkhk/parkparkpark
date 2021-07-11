import { baseLanguage } from './localeString'

export default {
  name: 'subTag',
  title: 'Subtag',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Display Name',
      type: 'localeString',
    },
    {
      name: 'isHot',
      title: 'Is Hot',
      type: 'boolean',
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'reference',
      to: [{ type: 'tag' }],
    },
  ],
  preview: {
    select: {
      title: `name.${baseLanguage.id}`,
      subtitle: `tag.name.${baseLanguage.id}`
    },
  },
}