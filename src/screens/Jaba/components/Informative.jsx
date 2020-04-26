import React from 'react'
import {
  Text,
  StyleSheet
} from 'react-native'
import { Foundation } from '@expo/vector-icons'

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'rgb(217,98,53)',
    justifyContent: 'center',
    left: '10%',
    alignItems: 'center'
  }
})

const Informative = ({
  text
}) => {
  return (
    <>
      <Foundation
        name="info"
        size={32}
        color="rgb(217,98,53)" />
      <Text
        style={styles.text}>
        {text}
      </Text>
    </>
  )
}

export default Informative
