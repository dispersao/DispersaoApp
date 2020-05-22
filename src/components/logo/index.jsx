import React from 'react'
import { 
  Image, 
  View, 
  StyleSheet, 
  Text
} from 'react-native'

import { useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginBottom: 0,
    paddingHorizontal: 30
  },
  img: {
    resizeMode: 'contain', 
    width: '100%'
  },
  text: {
    fontSize: 16,
    color: 'white',
    lineHeight: 25,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})

const imgSrc = '../../../assets/images/dispersao.png'

const Logo = () => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Image 
        style={styles.img}
        source={require('../../../assets/images/dispersao.png')}
      />
      <Text style={styles.text}>
        {t('general.logoDescription')}
      </Text>
    </View>
  )
}

export default Logo


