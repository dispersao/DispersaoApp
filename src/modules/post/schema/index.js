import { 
  normalize,
  schema
 } from 'normalizr'

 import { contentcreatorSchema } from '../../contentcreator/schema'

export const postSchema = new schema.Entity('posts', {
  contentcreator: contentcreatorSchema
})

export const postListSchema = [postSchema]

export const normalizePostList = (data) => {
  return normalize(data, postListSchema)
}

export const normalizePost = (data) => {
  return normalize(data, postSchema)
}
