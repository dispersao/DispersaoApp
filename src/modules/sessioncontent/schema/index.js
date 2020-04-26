import { 
  schema,
  normalize
 } from 'normalizr'
import { sessioncontentSchema } from './sessioncontent'

import { profileSchema } from '../../profile/schema'
import { commentSchema } from '../../comment/schema'
import { postSchema } from '../../post/schema'
import { scriptSchema } from '../../script/schema'
import { likeSchema } from '../../likes/schema/likes'

sessioncontentSchema.define({
  profile: profileSchema,
  comment: commentSchema,
  post: postSchema,
  script: scriptSchema,
  likes: [likeSchema]
})

export const sessioncontentListSchema = [sessioncontentSchema]

export const normalizeSessioncontentList = (data) => {
  return normalize(data, sessioncontentListSchema)
}

export const normalizeSessioncontent = (data) => {
  return normalize(data, sessioncontentSchema)
}
