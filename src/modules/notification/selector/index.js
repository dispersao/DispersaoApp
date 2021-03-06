import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import config from '../../../../config.json'

import { getState as getSessionContents } from '../../sessioncontent/selector'
const getState = (state) => state.notifications.get('data')
const getId = (state, props) => props.id
export const getLastInteracted = (state, props) =>
  state.notifications.get('lastInteracted')
export const getLastForeground = (state, props) =>
  state.notifications.get('lastForeground')

export const getNotificationsAsList = createSelector(
  [getState],
  (notifications) => {
    if (!notifications) {
      return
    }
    return notifications.valueSeq().map((n) => formatNotification(n))
  }
)

export const getNotificationsCount = createSelector(
  [getState],
  (notifications) => {
    if (!notifications) {
      return
    }
    return notifications.valueSeq().size
  }
)

export const getNotificationByNotificationId = createCachedSelector(
  [getState, getId],
  (notifications, id) => {
    if (!notifications || !id) {
      return
    }
    return formatNotification(notifications.get(id.toString()))
  }
)(getId)

export const getLastInteractedNotification = createSelector(
  [getState, getLastInteracted],
  (notifications, id) => {
    if (!notifications || !id) {
      return
    }
    return formatNotification(notifications.get(id.toString()))
  }
)

export const getLastForegroundNotification = createSelector(
  [getState, getLastForeground],
  (notifications, id) => {
    console.log('getLastForegroundNotification', notifications, id)
    if (!notifications || !id) {
      return
    }
    return formatNotification(notifications.get(id.toString()))
  }
)

export const getBadgeCount = createSelector(
  [getState, getSessionContents, getLastForeground],
  (notifications, sessioncontents, foreground) => {
    if (!notifications) {
      return
    }
    return notifications.filter(
      (not) =>{
        const notificationSessioncontent = sessioncontents.get(not.get('sessioncontent').toString())
        return not.get('id') !== foreground && (!notificationSessioncontent || !notificationSessioncontent.get('viewed'))
      }
    ).size
  }
)

const formatNotification = (notification) => {
  if (notification.get('thumb')) {
    const imageUrl = notification.get('thumb')
    return notification.set('thumb', `${config.api.url}${imageUrl}`)
  } else {
    return notification
  }
}
