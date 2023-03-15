import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import EnTranslation from '../locales/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: EnTranslation
    },
    react: {
      useSuspense: true
    }
  }).then(() => {
    console.log('i18n loaded')
  }).catch(() => {
    console.log('failed to load i18n')
  })

export default i18n
