import { normalize } from 'normalizr'
 
 import { appuserSchema } from '../../appuser/schema'

 import { likeSchema } from './likes'
 import { sessioncontentSchema } from '../../sessioncontent/schema/sessioncontent'

likeSchema.define({
  appuser: appuserSchema,
  sessioncontent: sessioncontentSchema
})

export const likeListSchema = [likeSchema]

export const normalizeLikesList = (data) => {
  return normalize(data, likeListSchema)
}

export const normalizeLikes = (data) => {
  return normalize(data, likeSchema)
}
