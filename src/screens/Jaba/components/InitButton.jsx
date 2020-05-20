import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Button } from 'native-base'

const styles = StyleSheet.create({
  button: { 
    width: '100%',
    backgroundColor: 'rgb(217, 98, 53)',
    padding: 10
  },
  text: { 
    fontSize: 15, 
    color: 'white'
  }
})

const InitButton = ({
  text,
  onPress
}) => {
  
  return (
    <Button 
      block 
      style={styles.button} 
      onPress={onPress}>
      <Text style={styles.text}>
        {text}
      </Text>
    </Button>
  )
}

export default InitButton
