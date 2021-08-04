import { defaultLanguage } from '../supportedLanguages'

export default {
  name: 'vehicleType',
  title: 'Vehicle type',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Display Name',
      type: 'localeString',
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
