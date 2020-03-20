import React from 'react'
import { StyleSheet } from 'react-native'

import SocialButton from '../SocialButton.jsx'

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3f53f5' 
  }
})

const FacebookButton = () => {
  return (
    <SocialButton 
      name='facebook'
      url='http://facebook.com'
      style={styles.button} />
  )
}

export default FacebookButton
