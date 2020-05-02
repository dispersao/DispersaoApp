import React from "react"
import { 
  StyleSheet, 
  Image 
} from "react-native"

import { Body, Text } from "native-base"

const styles = StyleSheet.create({
  postImage: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: "center",
  },
  textBody: {
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 14
  }
})

const PostBody = ({ 
  imageUrl, 
  videoUrl, 
  content 
}) => {
    const onHandleImageClick = () => {
      console.log('onclick image', videoUrl)
    }
  return (
    <>
      {content &&
        <Body style={styles.textBody}>
          <Text style={styles.text}>
            {content}
          </Text>
        </Body>
      }
      {imageUrl && (
        <Body>
          <Image 
            style={styles.postImage}
            source={imageUrl} 
            onClick={onHandleImageClick}/>
        </Body>
      )}
    </>
  )
}

export default PostBody
