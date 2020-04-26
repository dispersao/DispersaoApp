import { 
  normalize,
  schema
 } from 'normalizr'
 
 import { contentcreatorSchema } from '../../contentcreator/schema'

export const commentSchema = new schema.Entity('comments', {
  contentcreator: contentcreatorSchema
})

export const commentListSchema = [commentSchema]

export const normalizeCommentList = (data) => {
  return normalize(data, commentListSchema)
}

export const normalizeComment = (data) => {
  return normalize(data, commentSchema)
}
