import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { openBrowserAsync } from 'expo-web-browser'

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const SiteLink = () => {
  const handlePress = async () => {
    let result = openBrowserAsync('https://dispersao.net/')
    console.log(result)
  }
  
  return (
    <Text 
      style={styles.text}
      onPress={handlePress}
      >
        Conheça o site &gt;
      </Text>
  )
}

export default SiteLink
