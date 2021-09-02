export type SupportedLanguages = 'zh' | 'en'

export const supportedLanguages: Array<SupportedLanguages> = ['zh', 'en']

export const durationTranslations = {
  '0.5': {
    en: 'Half hourly',
    zh: '毎半小時',
  },
  '1': {
    en: 'Hourly',
    zh: '毎小時',
  },
  '1.5': {
    en: '1 1/2 hourly',
    zh: '毎1.5小時',
  },
  '2': {
    en: '2 hourly',
    zh: '毎2小時',
  },
}
