import { defaultLanguage } from '../supportedLanguages'

export default {
  name: 'paymentMethod',
  title: 'Payment method',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Display Name',
      type: 'localeString',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'shortDescription',
      title: 'Short description',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: `name.${defaultLanguage}`,
    },
  },
}
