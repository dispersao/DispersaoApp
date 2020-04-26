import React from 'react'
import { StyleSheet } from 'react-native'

import SocialButton from '../SocialButton.jsx'

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#c61c92' 
  }
})

const InstagramButton = () => {
  return (
    <SocialButton 
      name='instagram'
      url='https://www.instagram.com/dispersao.ofilme/'
      style={styles.button} />
  )
}

export default InstagramButton
