import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { updateAppuser } from '../../modules/appuser/actions'

import ForegroundNotification from '../../components/notification'

import { SafeAreaView, StyleSheet } from 'react-native'

import LanguageItem from './component/LanguageItem.jsx'

import { Content } from 'native-base'
import Constants from 'expo-constants'
import { getLanguages, getCurrentLanguage } from '../../translations/i18next'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  }
})

const Languages = ({ updateUser }) => {
  const { i18n } = useTranslation()

  const handleClick = (lang) => {
    i18n.changeLanguage(lang)
    updateUser(lang)
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Content>
          {getLanguages().map((lang, index) => (
            <LanguageItem
              key={index}
              language={lang}
              onClick={handleClick}
              selected={getCurrentLanguage() === lang}
            />
          ))}
        </Content>
      </SafeAreaView>
      <ForegroundNotification />
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateUser: (locale) => dispatch(updateAppuser({ locale }))
})

export default connect(null, mapDispatchToProps)(Languages)
