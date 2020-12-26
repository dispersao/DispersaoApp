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
  setNotificationChannelAsync
} from 'expo-notifications'

import { useTranslation } from 'react-i18next'

const NotificationManager = ({
  children,
  expotoken,
  onToken
}) => {

  const { t } = useTranslation()

  const setExpotoken = (token) => {
    onToken(token)
  }

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync()

    return () => {
      if(expotoken){
        console.log('removing listeners')
        removeNotificationSubscription(notificationListener)
        removeNotificationSubscription(responseListener)
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
      shouldShowAlert: true,
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
      console.log('received on foreground', notification)
    })

    responseListener.current = addNotificationResponseReceivedListener(response => {
      console.log('interacted with notification', response)
    })

    if (Platform.OS === 'android') {
      setNotificationChannelAsync('default', {
        name: 'default',
        importance: AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250]
      });
    }
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
