import React, {
   useState,
   useEffect
} from 'react'
import { Video } from 'expo-av'
import { View } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
const PlayerVideo = ({
  posterUrl,
  videoUrl,
  style,
  mounted
}) => {
  const [playerRef, setPlayerRef] = useState(null)

  const [loadStarted, setLoadStarted] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isWaitingToPlay, setIsWaitingToPly] = useState(false)

  const  setVideoRef = (comp) => {
    setPlayerRef(comp)
  }

  useEffect(()=> {
    if(playerRef && isPlaying && !mounted) {
      playerRef.pauseAsync()
    }
  }, [mounted])

  const updateStatus = (status) => {
    if (status.isPlaying) {
      setIsWaitingToPly(false)
      setIsPlaying(true)
    } else {
      if(status.didJustFinish) {
        videoRef.stopAsync()
      }
      setIsPlaying(false)
      
    }
  }

  const onLoadStart = () => {
    setLoadStarted(true)
  }

  const onLoaded = (event) => {
    setVideoLoaded(true)
    if (isWaitingToPlay) {
      playerRef.playAsync()
      playerRef.presentFullscreenPlayer()
    }
  }

  const playPause = () => {
    if(videoLoaded) {
      if (isPlaying) {
        playerRef.pauseAsync()
      } else {
        playerRef.playAsync()
        playerRef.presentFullscreenPlayer()
      }
    } else {
      setIsWaitingToPly(true)
    }
  }

  const onVideoReady = (status) => {
    // console.log(status)
  }

  return (
    <View style={style}>
      <Video
        source={{uri: videoUrl}}
        posterSource={{uri: posterUrl}}
        usePoster={true}
        rate={1.0}
        isMuted={true}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        isLooping
        useNativeControls={false}
        style={{
          width:'100%',
          height:'100%'
        }}
        onPlaybackStatusUpdate={updateStatus}
        onLoadStart={onLoadStart}
        onLoad={onLoaded}
        onReadyForDisplay={onVideoReady}
        ref={setVideoRef}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={playPause}
      >
      {(loadStarted && !isPlaying && !isWaitingToPlay && 
        <AntDesign
          style={styles.button}
          name="play" 
          size={60} 
          color="#d96235"
          />
        ) || null
      }
      {isWaitingToPlay && 
        <ActivityIndicator
          size="large"
          color="#d96235"
        />
      }
    </TouchableOpacity>
  </View>
  )
}

export default PlayerVideo
