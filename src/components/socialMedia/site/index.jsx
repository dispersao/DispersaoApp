import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { openBrowserAsync } from 'expo-web-browser'

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const SiteLink = ({
  text
}) => {
  const handlePress = async () => {
    let result = openBrowserAsync('https://dispersao.net/')
  }
  
  return (
    <Text 
      style={styles.text}
      onPress={handlePress}>
      {text} &gt;
    </Text>
  )
}

export default SiteLink
