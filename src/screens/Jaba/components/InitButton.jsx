import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Button } from 'native-base'

const styles = StyleSheet.create({
  button: { 
    width: '100%',
    padding: 10
  },
  buttonActive: {
    backgroundColor: 'rgb(217, 98, 53)',
  },
  buttonInactive: {
    backgroundColor: 'gray',
  },
  text: { 
    fontSize: 15, 
    color: 'white'
  }
})

const InitButton = ({
  text,
  enabled,
  onPress
}) => {

  const buttonType = enabled ? styles.buttonActive : styles.buttonInactive
  
  return (
    <Button 
      block 
      style={StyleSheet.compose(styles.button, buttonType)} 
      disabled={!enabled}
      onPress={onPress}>
      <Text style={styles.text}>
        {text}
      </Text>
    </Button>
  )
}

export default InitButton
