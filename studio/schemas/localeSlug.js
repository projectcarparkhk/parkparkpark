const supportedLanguages = [
  { id: 'zh', title: 'Traditional Chinese', isDefault: true },
  { id: 'en', title: 'English', isSlug: true },
]

export default {
  title: 'Localized slug',
  name: 'localeSlug',
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
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
      },
    },
  ],
  // Dynamically define one field per language
  fields: supportedLanguages.map((lang) => ({
    title: `${lang.title} Slug`,
    name: `${lang.id}Slug`,
    type: 'slug',
    fieldset: lang.isDefault ? null : 'translations',
    options: {
      source: `name.${lang.id}`,
      maxLength: 96,
      slugify: (input) =>
        input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
    },
  })),
}
