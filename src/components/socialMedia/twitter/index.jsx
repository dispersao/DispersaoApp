import React from 'react'
import { StyleSheet } from 'react-native'

import SocialButton from '../SocialButton.jsx'

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#589fc2' 
  }
})

const TwitterButton = () => {
  return (
    <SocialButton 
      name='twitter'
      url='http://twitter.com'
      style={styles.button} />
  )
}

export default TwitterButton
