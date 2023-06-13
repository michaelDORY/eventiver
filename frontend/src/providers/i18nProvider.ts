import polyglotI18nProvider from 'ra-i18n-polyglot'
import { enMessagess } from '@/i18n/en'
import { uaMessagess } from '@/i18n/ua'

const translations = { en: enMessagess, ua: uaMessagess }

export const i18nProvider = polyglotI18nProvider((locale) => translations[locale as keyof typeof translations], 'en', [
  { locale: 'en', name: 'English' },
  { locale: 'ua', name: 'Українська' },
])
