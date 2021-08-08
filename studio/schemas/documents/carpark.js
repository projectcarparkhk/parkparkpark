import { defaultLanguage } from '../supportedLanguages'

export default {
  name: 'carpark',
  title: 'Carpark',
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
      name: 'subDistrict',
      title: 'Sub District',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'subDistrict' } }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gateImage',
      title: 'Gate image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Price details',
      name: 'priceDetails',
      type: 'table',
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'post' } }],
    },
    {
      name: 'paymentMethods',
      title: 'Payment methods',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'paymentMethod' } }],
    },
    {
      name: 'descriptions',
      title: 'Descriptions',
      type: 'localeBlockContent',
    },
    {
      name: 'infoTables',
      title: 'Info tables',
      type: 'array',
      of: [
        {
          title: 'Info table',
          type: 'object',
          fields: [
            {
              name: 'tableName',
              title: 'Table name',
              type: 'localeString',
            },
            {
              title: 'Table',
              name: 'table',
              type: 'table',
            },
          ],
        },
      ],
    },
    {
      name: 'vehicleTypes',
      title: 'Vehicle types',
      type: 'array',
      of: [
        {
          title: 'Vehicle type',
          name: 'vehicleType',
          type: 'object',
          fields: [
            {
              title: 'Vehicle type',
              name: 'vehicleType',
              type: 'reference',
              to: [{ type: 'vehicleType' }],
            },
            {
              title: 'Spots',
              name: 'spots',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'phoneNumber',
      title: 'Phone number',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: `name.${defaultLanguage}`,
      subtitle: `subDistrict.0.name.${defaultLanguage}`,
      media: 'mainImage',
    },
  },
}
