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
      url='https://www.twitter.com/DispersaoFilme/'
      style={styles.button} />
  )
}

export default TwitterButton
