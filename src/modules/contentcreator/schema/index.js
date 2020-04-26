import { 
  normalize,
  schema
 } from 'normalizr'

export const contentcreatorSchema = new schema.Entity('contentcreators', {})
export const contentcreatorsListSchema = [contentcreatorSchema]

export const normalizeContentcreatorList = (data) => {
  return normalize(data, contentcreatorsListSchema)
}

export const normalizeContentcreator = (data) => {
  return normalize(data, contentcreatorSchema)
}
