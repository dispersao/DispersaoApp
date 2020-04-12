import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Text } from 'native-base'

const color = "#d96235"
const styles = StyleSheet.create({
  text: {
    fontSize: 12, 
    color: color
  }
})

const IconFeedback = ({
  amount,
  icon,
  onClick
}) => {
  const onHandleClick = () => {
    onClick && onClick()
  }
  return (
    <>
      <Ionicons 
        name={icon} 
        color={color} 
        size={17}
        onClick={onHandleClick}
      />
      <Text 
        style={styles.text}> 
          {amount}
        </Text>
      </>
  )
}

export default IconFeedback
