import { defaultLanguage, supportedLanguages } from '../supportedLanguages'

export default {
  title: 'Localized table',
  name: 'localeTable',
  type: 'object',
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
    },
  ],
  // Dynamically define one field per language
  fields: supportedLanguages.reduce(
    (acc, lang) => [
      ...acc,
      {
        title: `${lang.label} table name`,
        name: `${lang.code}TableName`,
        type: 'string',
        fieldset: lang.code === defaultLanguage ? null : 'translations',
      },
      {
        title: `${lang.label} table`,
        name: `${lang.code}Table`,
        type: 'table',
        fieldset: lang.code === defaultLanguage ? null : 'translations',
      },
    ],
    []
  ),
}
