import { 
  normalize,
  schema 
} from 'normalizr'

import { scriptSchema } from '../../script/schema'

export const appuserSchema = new schema.Entity('appusers', {
  script: scriptSchema
})

export const appuserListSchema = [appuserSchema]

export const normalizeAppuserList = (data) => {
  return normalize(data, appuserListSchema)
}

export const normalizeAppuser = (data) => {
  return normalize(data, appuserSchema)
}
