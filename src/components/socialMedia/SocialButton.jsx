import React from 'react'
import { Button } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import { 
  StyleSheet, 
} from 'react-native'
import { Linking } from 'expo'


const styles = StyleSheet.create({
  button: {
    height: 38, 
    width: 38, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 2, 
    marginHorizontal: 5, 
  },
  entypo: {
    color: 'white'
  }
})

const SocialButton = ({
  name,
  url,
  style
}) => {
  const navigateTo = () => {
    Linking.openURL(url)
  }

  return (
    <Button 
      rounded 
      style={[styles.button, style]} 
      onPress={navigateTo}>
      <Entypo 
        name={name} 
        size={22} 
        style={styles.entypo} />
    </Button>
  )
}


export default SocialButton
