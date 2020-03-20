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
      url='http://instagram.com'
      style={styles.button} />
  )
}

export default InstagramButton
