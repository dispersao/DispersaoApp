import React from 'react'
import { Image } from 'react-native'

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain', 
    paddingHorizontal: 50, 
    width: "100%", 
    height: "100%"
  }
})

const imgSrc = '../../../assets/images/dispersao_jaba.png'

const Logo = () => {
  return (
    <Image 
      source={require(imgSrc)} 
      style={styles.img } 
    />
  )
}

export default Logo


