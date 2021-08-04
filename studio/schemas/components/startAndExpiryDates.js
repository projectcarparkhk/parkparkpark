import { defaultLanguage, supportedLanguages } from "../supportedLanguages"

export default {
  title: 'Start and expiry dates',
  name: 'startAndExpiryDates',
  type: 'object',
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets: [
    {
      title: 'Start and expiry dates',
      name: 'startAndExpiryDates',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
    },
  ],
  // Dynamically define one field per language
  fields: [
    {
      title: 'Start date',
      name: 'startDate',
      type: 'datetime'
    },
    {
      title: 'Expiry date',
      name: 'expiryDate',
      type: 'datetime',
    }
  ]
}
