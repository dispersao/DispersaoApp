import React from 'react'
import Constants from 'expo-constants'
import SiteLink from '../../components/socialMedia/site/index.jsx'

import { 
  SafeAreaView, 
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

import { Content } from 'native-base'

import { useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 20, 
  },
  imgContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20
  }, 
  img: {
    flex:1, 
    resizeMode: 'contain',
    width: '100%'
  },
  textContainer: {
    paddingVertical: 20, 
    fontSize: 14
  },
  linkContainer: {
    paddingVertical: 30,
    color: 'rgb(217, 98, 53)',
    textAlign: 'center',
    paddingHorizontal: 30
  },
})

const InfoScreen = ({

}) => {
  const { t } = useTranslation()

  return (
    <SafeAreaView style={styles.container}>
      <Content padder >
        <View style={styles.imgContainer}>
          <Image  
            source={require('../../../assets/images/dispersao_logo.png')} 
            style={styles.img}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {t('info.text')}
          </Text>
        </View>
        <Text style={styles.linkContainer}>
          <SiteLink text={t('info.link')} />
        </Text>
      </Content>
    </SafeAreaView>
  )
}

export default InfoScreen
