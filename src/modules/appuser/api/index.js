import axios from 'axios'
import config from '../../../../config.json'

import { 
  normalizeAppuser, 
  normalizeAppuserList
} from '../schema'

if (axios.defaults.baseURL) {
  axios.defaults.baseURL = config.api.url
  axios.defaults.headers.post['Content-Type'] = 'json'
}

export const createAppuser = async (appuser) => {
  const user = await axios.post('/appusers', appuser)
  return normalizeAppuser(user.data)
}

export const findAppuser = async (options) => {
  let query = '/appusers'
  if (options.id) {
    query = `${query}/${options.id}`
  } else if (options.expotoken) {
    query = `${query}?expotoken=${options.expotoken}`
  }
  const user = await axios.get(query)
  
  if (Array.isArray(user.data)) {
    return normalizeAppuserList(user.data)
  } else {
    return normalizeAppuser(user.data)
  }
}

export const updateAppuser = async (options) => {
  const { id } = options
  const params = { ... options }
  delete params['id']

  const user = await axios.put(`/appusers/${id}`, params)
    .catch(error => {
      if(error.response.data) {
        throw error.response.data
      } else {
        throw error
      }
    })
  return normalizeAppuser(user.data)
}
