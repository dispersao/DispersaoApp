import { 
  normalize,
  schema
 } from 'normalizr'

import { contentcreatorSchema } from '../../contentcreator/schema'

export const profileSchema = new schema.Entity('profiles', {
  contentcreator: contentcreatorSchema
})

export const profileListSchema = [profileSchema]

export const normalizeProfileList = (data) => {
  return normalize(data, profileListSchema)
}

export const normalizeProfile = (data) => {
  return normalize(data, profileSchema)
}
