import React from 'react'
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native'

import { useTranslation } from 'react-i18next'


const imgSrc = '../../../assets/images/dispersao.png'

// react hell: it will always render the images as square, unless you manually
// define the width and height
const win =  Dimensions.get('window')
const ratio = 0.66*(win.width/509) //509 is actual image width. we will leave some room left and right, hence 0.9


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  img: {
    resizeMode: 'contain',
    width: win.width,
    height: (260* ratio), //260 is the actual height of the png
    marginBottom: 20,
  },
  text: {
    fontSize: 10,
    color: 'white',
    lineHeight: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  }
})



const smallLogo = () => {
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

export default smallLogo
