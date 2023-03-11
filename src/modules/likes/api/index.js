import axios from 'axios'
import config from '../../../../config.json'

import {
  normalizeLikes
} from '../schema'

axios.defaults.baseURL = config.api.url
axios.defaults.headers.post['Content-Type'] = 'json'

export const createLike = async (options) => {  
  let like = await axios.post('likes', options)

  return normalizeLikes(like.data)
}

export const updateLike = async (options) => {
  const { id } = options
  const params = { ... options }
  delete params['id']

  let like = await axios.put(`/likes/${id}`, params)
  return normalizeLikes(like.data)
}

export const deleteLike = async (options) => {  
  const { id } = options
  const params = { ... options }
  delete params['id']

  let like = await axios.delete(`/likes/${id}`, params)
  return normalizeLikes(like.data)
}
