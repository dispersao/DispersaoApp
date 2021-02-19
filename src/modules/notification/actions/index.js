import { normalizeNotificationList, normalizeNotification } from '../schema'

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const SET_NOTIFICATION_VIEWED = 'SET_NOTIFICATION_VIEWED'
export const SET_INTERACTED_NOTIFICATION = 'SET_INTERACTED_NOTIFICATION'
export const CLEAR_INTERACTED_NOTIFICATION = 'CLEAR_INTERACTED_NOTIFICATION'
export const SET_FOREGROUND_NOTIFICATION = 'SET_FOREGROUND_NOTIFICATION'
export const CLEAR_FOREGROUND_NOTIFICATION = 'CLEAR_FOREGROUND_NOTIFICATION'

export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  payload: {
    notifications: normalizeNotificationList([notification]).entities.notifications
  }
})

export const setNotificationViewed = (notification) => ({
  type: SET_NOTIFICATION_VIEWED,
  payload: {
    notification: normalizeNotification(notification).entities
  }
})

export const setInteractedNotification = (notification) => ({
  type: SET_INTERACTED_NOTIFICATION,
  payload: {
    notification
  }
})

export const clearInteractedNotification = (notification) => ({
  type: CLEAR_INTERACTED_NOTIFICATION,
  payload: {
    notification
  }
})

export const setForegroundNotification = (notification) => ({
  type: SET_FOREGROUND_NOTIFICATION,
  payload: {
    notification
  }
})

export const clearForegroundNotification = (notification) => ({
  type: CLEAR_FOREGROUND_NOTIFICATION,
  payload: {
    notification
  }
})
