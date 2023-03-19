import React, {
  useState,
  useCallback
} from "react"

import { useFocusEffect } from '@react-navigation/native'

import { 
  StyleSheet, 
  Image
} from "react-native"

import { useNavigation } from '@react-navigation/native'

import ParsedText from 'react-native-parsed-text'

import {
   Body 
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
    paddingHorizontal: 16,
    paddingBottom: 10
  },
  username: {
    color: '#d96235'
  }
})

const PostBody = ({ 
  media, 
  content,
  video
}) => {

  const [pageIsMounted, setPageIsMounted] = useState(true)

  const { navigate } = useNavigation()

  let pattern = /\[((@)([^:]+)):([^\]]+)\]/i

  useFocusEffect(useCallback(() => {
    setPageIsMounted(true)
    return () => {
      setPageIsMounted(false)
    }
  }, []))

  const renderText = (matchingString, matches) => {
    let match = matchingString.match(pattern)
    return `${match[3]}`
  }

  const handleNamePress = (name, matchIndex) => {
    let match = name.match(pattern)
    
    navigate('Profiles', {
      screen: 'Profile',
      params: { contentcreator: parseInt(match[4]) }
    })
  }

  return (
    <Body style={styles.container}>
      {content &&
        <ParsedText
          style={styles.text}
          parse={
            [
              { 
                pattern: /\[(@[^:]+):([^\]]+)\]/i, 
                style: styles.username,
                onPress: handleNamePress, 
                renderText: renderText
              },
            ]
          }
          childrenProps={{allowFontScaling: false}}
        >
          {content}
        </ParsedText>
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
