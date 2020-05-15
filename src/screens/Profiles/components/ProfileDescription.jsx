import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native'

const styles = StyleSheet.create({
  container: {
  },
  text: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center'
  }
})

const ProfileDescription = ({
  text
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  )
}

export default ProfileDescription
