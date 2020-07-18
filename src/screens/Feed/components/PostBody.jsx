import React, {
  useState
} from "react"
import { Video } from 'expo-av'

import { 
  StyleSheet, 
  ImageBackground
} from "react-native"

import { Ionicons } from "@expo/vector-icons"


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
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
  },

  video: {
    width: '100%',
    height: 230
  },
  
  text: {
    fontSize: 14,
    paddingHorizontal: 5,
    paddingBottom: 10
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
})

const PostBody = ({ 
  media, 
  content,
  video
}) => {

  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    const onVideoClick = (ev) => {
      setIsVideoPlaying(true)
    }

    const updateStatus = (status) => {
      console.log(status)
    }

  return (
    <Body style={styles.container}>
      {content &&
        <Text style={styles.text}>
          {content}
        </Text>
      }
      {!isVideoPlaying && media && (
        <ImageBackground 
          style={styles.postImage}
          source={{uri: media.url}}
          onPress={onVideoClick}
          >
            {video && 
              <Ionicons.Button
                style={styles.button}
                name="ios-arrow-dropright-circle" 
                size={24} 
                color="#d96235"
                backgroundColor={"rgba(255,255,255,5)"}
                onPress={onVideoClick}
                />
            }
        </ImageBackground>
      ) || null}
      {isVideoPlaying && video && (
        <Video
          source={{uri: video.url}}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={false}
          useNativeControls
          style={styles.video}
          onPlaybackStatusUpdate={updateStatus}
        />
      ) || null}
    </Body>
  )
}

export default PostBody
