import axios from 'axios'
import config from '../../../../config.json'

import {
  normalizeSessioncontentList
} from '../schema'

axios.defaults.baseURL = config.api.url
axios.defaults.headers.post['Content-Type'] = 'json'
axios.defaults.headers.get['Cache-control'] = 'maxAge=0'

export const fetchSessioncontents = async ({ script, types = [] }) => {
  let query = `sessioncontents?script.token=${script}`
  let queries = []
  if (types.length) {
    queries = types.map(t => `${query}&${t}_null=false&state=published`)
  } else {
    queries.push(query)
  }
  let sessioncontents = await Promise.all(queries.map(q => axios.get(q)))
  sessioncontents = sessioncontents
    .map(sescon => sescon.data)
    .reduce((a, b) => a.concat(b))
    
  return normalizeSessioncontentList(sessioncontents)
}

export const fetchSessioncontentsLikes = async({ id, ...options }) => {
  let query = Object.entities(options).map(([k, v]) => `${k}=${v}`).join('&')
  return axios.get(`sessioncontents/${id}/likes/count?${query}`)
}
