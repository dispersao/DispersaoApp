import React, { 
  useEffect,
  useRef
} from 'react'

import PropTypes from 'prop-types'

import { Alert, Platform } from "react-native"

import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'

import { 
  setNotificationHandler,
  addNotificationReceivedListener,
  getExpoPushTokenAsync,
  removeNotificationSubscription,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  setNotificationChannelAsync,
  useLastNotificationResponse,
  DEFAULT_ACTION_IDENTIFIER
} from 'expo-notifications'

import { useTranslation } from 'react-i18next'

let responseListener 
if(Platform.OS === 'android') {
  setNotificationChannelAsync('default', {
    name: 'dispersao-posts',
    vibrationPattern: [0, 250, 250, 250],
    sound: 'default',
    priority: AndroidImportance.MAX
  });

  responseListener = addNotificationResponseReceivedListener(response => {
    const {notification: {request: {content: { data }}}} = response
    Alert.alert(`interacted with `, JSON.stringify(data))
  })
}

const NotificationManager = ({
  children,
  expotoken,
  onToken
}) => {
  const lastNotificationResponse = useLastNotificationResponse()
  const { t } = useTranslation()

  const setExpotoken = (token) => {
    onToken(token)
  }

  const notificationListener = useRef()
  // const responseListener = useRef()

  useEffect(() => {
    Alert.alert(`fire mount when coming from background`, 'mount')
    registerForPushNotificationsAsync()
    // console.log('lastNotificationResponse', lastNotificationResponse)
    // Alert.alert('last notification', JSON.stringify(lastNotificationResponse))
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request
    ){
      Alert.alert(`last notification`, JSON.stringify(lastNotificationResponse.request))
    }

    return () => {
      if(expotoken){
        console.log('removing listeners')
        notificationListener?.current?.remove()
        responseListener?.remove()
        // removeNotificationSubscription(notificationListener)
        // removeNotificationSubscription(responseListener)
      }
    }
  }, [])

  useEffect(() => {
    if(expotoken){
      setNotificationSettings()
    }
  }, [expotoken])

  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false,
      shouldPlaySound: true,
      shouldSetBadge: false
    }),
  })
  
  const registerForPushNotificationsAsync = async () => {
    const emptyToken = () => setExpotoken('')

    if (Constants.isDevice) {
      try {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        )
        
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          )
          finalStatus = status
        }
        if (finalStatus !== 'granted') {
          displayAlert(t('splash.notGranted'), 'OK', emptyToken)
        } else {
          let token = await getExpoPushTokenAsync()
          setExpotoken(token?.data)
        }
      } catch (e) {
        displayAlert(e.message, 'OK', emptyToken)
      }
    } else {
      displayAlert(t('splash.notDevice'), 'OK', emptyToken)
    }
  }

  const displayAlert = (body, button, callback) => {
    Alert.alert(
      t('splash.permission'), 
      body, 
      [{
        text: button,
        onPress: callback
      }]
    )
  }

  const setNotificationSettings = () => {
    console.log('adding listeners')

    notificationListener.current = addNotificationReceivedListener(notification => {
      Alert.alert(`received in foreground`, JSON.stringify(notification.request.content.data))
    })

    /*if (Platform.OS === 'android') {

      setNotificationChannelAsync('default', {
        name: 'dispersao-posts',
        vibrationPattern: [0, 250, 250, 250],
        sound: 'default',
        priority: AndroidImportance.MAX
      });

      responseListener.current = addNotificationResponseReceivedListener(response => {
        const {notification: {request: {content: { data }}}} = response
        Alert.alert(`interacted with `, JSON.stringify(data))
      })
    }*/
  }

  return (
    <>
      {children}
    </>
  )
}

NotificationManager.propTypes = {
  children: PropTypes.node,
  onToken: PropTypes.func,
  expotoken: PropTypes.string
}

export default NotificationManager
