import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Alert, Platform, Text } from 'react-native'

import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

import { useTranslation } from 'react-i18next'
import {
  addNotification,
  setInteractedNotification,
  setForegroundNotification
} from '../../../modules/notification/actions'

import { getNotificationsCount } from '../../../modules/notification/selector'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'dispersao-posts',
    vibrationPattern: [0, 250, 250, 250],
    sound: 'default',
    priority: Notifications.AndroidImportance.MAX
  })
}

let lastInterNoti = ''
let backListener = Notifications.addNotificationResponseReceivedListener(
  (response) => {
    const {
      notification: {
        request: {
          content: { data }
        }
      }
    } = response
    console.log(`interacted with `, JSON.stringify(data))
    lastInterNoti = data
  }
)

const NotificationManager = ({
  totalNotifications = 0,
  addNotification,
  setInteractedNotification,
  setForegroundNotification,
  onToken,
  children
}) => {
  const [lastInteractedNotification, setLastInteractedNotification] = useState(
    ''
  )
  const [
    lastFrontReceivedNotification,
    setLastFrontReceivedNotification
  ] = useState('')

  const { t } = useTranslation()

  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  if (lastNotificationResponse) {
    console.log(
      'last notification',
      JSON.stringify(
        lastNotificationResponse.notification?.request?.content?.data
      )
    )
  }

  const setExpotoken = (token) => {
    onToken(token)
  }

  useEffect(() => {
    if (
      JSON.stringify(lastInterNoti) !==
      JSON.stringify(lastInteractedNotification)
    ) {
      setLastInteractedNotification(lastInterNoti)
      addNotification({
        ...lastInterNoti,
        id: totalNotifications + 1,
        received_at: performance.now()
      })
      setInteractedNotification(totalNotifications + 1)
    }
  }, [JSON.stringify(lastInterNoti)])

  useEffect(() => {
    let frontListener = Notifications.addNotificationReceivedListener(
      ({
        request: {
          content: { data }
        }
      }) => {
        if (
          JSON.stringify(data) !== JSON.stringify(lastFrontReceivedNotification)
        ) {
          setLastFrontReceivedNotification(data)
          addNotification({
            ...data,
            id: totalNotifications + 1,
            received_at: performance.now()
          })
          setForegroundNotification(totalNotifications + 1)
        }
        console.log(`received in foreground`, data)
      }
    )

    registerForPushNotificationsAsync()

    return () => {
      frontListener?.remove()
      backListener?.remove()
      Notifications.removeNotificationSubscription(backListener)
      Notifications.removeNotificationSubscription(frontListener)
    }
  }, [])

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
          let token = await Notifications.getExpoPushTokenAsync()
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
    Alert.alert(t('splash.permission'), body, [
      {
        text: button,
        onPress: callback
      }
    ])
  }

  return children
}

NotificationManager.propTypes = {
  children: PropTypes.node,
  onToken: PropTypes.func,
  expotoken: PropTypes.string,
  totalNotifications: PropTypes.number,
  addNotification: PropTypes.func,
  setInteractedNotification: PropTypes.func,
  setForegroundNotification: PropTypes.func
}

const mapStateToProps = (state) => ({
  totalNotifications: getNotificationsCount(state)
})

const mapDispatchToProps = (dispatch) => ({
  addNotification: (notification) => dispatch(addNotification(notification)),
  setForegroundNotification: (notification) =>
    dispatch(setForegroundNotification(notification)),
  setInteractedNotification: (notification) =>
    dispatch(setInteractedNotification(notification))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager)
