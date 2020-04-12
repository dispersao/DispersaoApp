import { 
  normalize,
  schema
 } from 'normalizr'

import { profileSchema } from '../../profile/schema'
import { commentSchema } from '../../comment/schema'
import { postSchema } from '../../post/schema'
import { scriptSchema } from '../../script/schema'

export const sessioncontentSchema = new schema.Entity('sessioncontents', {
  profile: profileSchema,
  comment: commentSchema,
  post: postSchema,
  script: scriptSchema
})

export const sessioncontentListSchema = [sessioncontentSchema]

export const normalizeSessioncontentList = (data) => {
  return normalize(data, sessioncontentListSchema)
}

export const normalizeSessioncontent = (data) => {
  return normalize(data, sessioncontentSchema)
}
