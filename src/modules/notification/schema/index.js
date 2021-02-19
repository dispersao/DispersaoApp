import { 
  normalize,
  schema
 } from 'normalizr'

 import { sessioncontentSchema } from '../../sessioncontent/schema/sessioncontent'

export const notificationSchema = new schema.Entity('notifications', {
  sessioncontent: sessioncontentSchema
})

export const notificationListSchema = [notificationSchema]

export const normalizeNotificationList = (data) => {
  return normalize(data, notificationListSchema)
}

export const normalizeNotification = (data) => {
  return normalize(data, notificationSchema)
}
