import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    padding: 5,
    paddingLeft: 15
  },
  buttonPressedWhite: {
    backgroundColor: 'white'
  },
  buttonPressedBlack: {
    backgroundColor: 'black'
  }
})

const buttonPressedDarkMode = StyleSheet.compose(
  styles.button,
  styles.buttonPressedBlack
)
const buttonPressed = StyleSheet.compose(
  styles.button,
  styles.buttonPressedWhite
)

const BackButton = ({ onPress, darkMode = false }) => {
  const [isPressed, setIsPressed] = useState(false)

  const pressedStyle = darkMode ? buttonPressedDarkMode : buttonPressed

  return (
    <Ionicons.Button
      style={isPressed ? pressedStyle : styles.button}
      name="ios-arrow-back"
      color="#999999"
      backgroundColor="rgba(255,255,255,0)"
      size={25}
      onPress={() => onPress && onPress()}
      onHideUnderlay={() => setIsPressed(false)}
      onShowUnderlay={() => setIsPressed(true)}
    />
  )
}

export default BackButton
