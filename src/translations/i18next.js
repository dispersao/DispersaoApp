import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization'
import resources from '../../assets/i18n'

import { retrieveData } from '../modules/asyncStorage'
const fallback = 'pt'

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: callback => {
  //   return Localization.getLocalizationAsync()
  //   .then(({ locale }) => {
  //   callback(locale)
  // })
    return retrieveData('language')
    .then(locale => {
      return (locale && { locale }) || Localization.getLocalizationAsync()
    }).then(({locale}) => {
      console.log('setting locale ', locale)
      callback(locale)
    })
  },
  init: () => {},
  cacheUserLanguage: () => {},
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: fallback,
    ns: ['translation'],
    defaultNS: 'translation',
    resources,
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    }
  })

export default i18n

export const getCurrentLanguage = () => {
  const curLang = i18n.languages[0].split('-')[0]
  if (!Object.keys(resources).includes(curLang)) {
    return fallback
  } else {
    return curLang
  }
}

export const getLanguages = () => {
  return Object.keys(resources)
}

export const getLanguageName = (lang) => {
  const lang_t = i18n.getFixedT(lang)
  return lang_t('general.languageName')
}
