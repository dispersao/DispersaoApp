import i18n from 'i18n-js'
import * as Localization from 'expo-localization'

import resources from '../../assets/i18n'

const locale = Localization.locale
i18n.defaultLocale = 'pt'
i18n.fallbacks = true
i18n.translations = resources
i18n.locale = locale

export default i18n
