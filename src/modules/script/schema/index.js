import { 
  normalize,
  schema
 } from 'normalizr'

export const scriptSchema = new schema.Entity('scripts', {}, { idAttribute: 'token'})

export const scriptsListSchema = [scriptSchema]

export const normalizeScriptList = (data) => {
  return normalize(data, scriptsListSchema)
}

export const normalizeScript = (data) => {
  return normalize(data, scriptSchema)
}
