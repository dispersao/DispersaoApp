import React, {
   useState,
   useEffect
} from 'react'
import { Video } from 'expo-av'
import { View, Text } from 'native-base'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

import { useTranslation } from 'react-i18next'

import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

const styles = StyleSheet.create({
  graphicContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    width: '100%',
    height: '100%'
  },
  mute: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    marginTop: 20,
    justifyContent: 'flex-end',
    position: 'absolute',
    right:0,
    backgroundColor: "black",
    opacity: 0.5
  },
  muteText: {
    color: "#999999",
    paddingRight: 5
  },
  muteIcon: {

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

  const { t } = useTranslation()

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
        style={styles.video}
        onPlaybackStatusUpdate={updateStatus}
        onLoadStart={onLoadStart}
        onLoad={onLoaded}
        onReadyForDisplay={onVideoReady}
        ref={setVideoRef}
      />
      <TouchableOpacity
        style={styles.graphicContainer}
        onPress={playPause}
      >
      {!isPlaying && 
       (<View style={styles.mute}>
          <Text style={ styles.muteText }>
            {t('feed.noSound')}
            </Text>
          <MaterialCommunityIcons
            style={styles.muteIcon}
            name="volume-mute"
            color="#999999"
            size={20} 
           />
        </View>)
      || null}
      {(loadStarted && !isPlaying && !isWaitingToPlay && 
       <View style={styles.buttonContainer}>
        <AntDesign
          style={styles.button}
          name="play" 
          size={60} 
          color="#d96235"
          />
          </View>
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
