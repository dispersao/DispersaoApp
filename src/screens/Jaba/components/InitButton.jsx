import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Button } from 'native-base'

const styles = StyleSheet.create({
  button: { 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgb(217, 98, 53)' 
  },
  text: { 
    fontSize: 15, 
    color: 'white', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
})

const InitButton = ({
  text,
  onPress
}) => {
  
  return (
    <Button 
      rounded 
      style={styles.button} 
      onPress={onPress}>
      <Text style={styles.text}>
        {text}
      </Text>
    </Button>
  )
}

export default InitButton
