import React, {
  useState,
  useCallback
} from "react"

import { useFocusEffect } from '@react-navigation/native'

import { 
  StyleSheet, 
  Image
} from "react-native"


import {
   Body, 
   Text 
} from "native-base"

import VideoPlayer from '../../../components/videoPlayer'


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
  }
})

const PostBody = ({ 
  media, 
  content,
  video
}) => {

  const [pageIsMounted, setPageIsMounted] = useState(true)

  useFocusEffect(useCallback(() => {
    setPageIsMounted(true)
    return () => {
      setPageIsMounted(false)
    }
  }), [])

  return (
    <Body style={styles.container}>
      {content &&
        <Text style={styles.text}>
          {content}
        </Text>
      }
      {(media && video && 
        <VideoPlayer
          posterUrl={media.url}
          videoUrl={video.url}
          style={styles.video}
          mounted={pageIsMounted}
        />
        ) || null }
        {(media && !video &&
         <Image 
          style={styles.postImage}
          source={{uri: media.url}}/>
        ) || null}
     
    </Body>
  )
}

export default PostBody
