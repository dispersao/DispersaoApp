import React from "react"
import { 
  StyleSheet, 
  Image,
  View
} from "react-native"

import { Body, Text } from "native-base"

const styles = StyleSheet.create({
  container: {
    padding: 0
  },
  postImage: {
    flex: 1,
    resizeMode: "contain",
    alignSelf: "center",
    width: '100%',
    height: 230
  },
  
  text: {
    fontSize: 14,
    paddingHorizontal: 5,
    paddingBottom: 10
  }
})

const PostBody = ({ 
  media, 
  content 
}) => {
    const onHandleImageClick = () => {
      console.log('onclick image', media.url)
    }
  return (
    <Body style={styles.container}>
      {content &&
        <Text style={styles.text}>
          {content}
        </Text>
      }
      {media && (
        <Image 
          style={styles.postImage}
          source={{uri: media.url}}
          onClick={onHandleImageClick}/>
      )}
    </Body>
  )
}

export default PostBody
