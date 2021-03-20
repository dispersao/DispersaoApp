import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Text } from 'native-base'

const color = '#d96235'
const unmarkedColor = '#999999'
const styles = StyleSheet.create({
  button: {
    padding: 5
  },
  text: {
    fontSize: 12,
    color: color
  },
  unmarkedText: {
    fontSize: 14,
    color: unmarkedColor
  }
})

const IconFeedback = ({ amount, icon, onClick, marked, isButton = true }) => {
  const onHandleClick = () => {
    onClick && onClick()
  }
  return (
    <>
      {(isButton && 
        <Ionicons.Button
          styles={styles.button}
          name={icon}
          color={marked ? color : unmarkedColor}
          backgroundColor="white"
          size={22}
          onPress={onHandleClick}
        >
          <Text style={marked ? styles.text : styles.unmarkedText}>
            {amount}
          </Text>
        </Ionicons.Button>
      ) || (
        <Ionicons
          styles={styles.button}
          name={icon}
          color={marked ? color : unmarkedColor}
          size={22}
        >
          <Text style={marked ? styles.text : styles.unmarkedText}>
            {amount}
          </Text>
        </Ionicons>
      )}
    </>
  )
}

export default IconFeedback
