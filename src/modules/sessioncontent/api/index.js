import axios from 'axios'
import config from '../../../../config.json'

import { normalizeSessioncontentList } from '../schema'

axios.defaults.baseURL = config.api.url
axios.defaults.headers.post['Content-Type'] = 'json'
axios.defaults.headers.get['Cache-control'] = 'maxAge=0'

export const fetchSessioncontents = async ({ script, types = [] }) => {
  let query = `scripts/${script}/sessioncontents`
  let queries = []
  if (types.length) {
    queries = types.map(t => `${query}?type=${t}`)
  } else {
    queries.push(query)
  }
  let sessioncontents = await Promise.all(queries.map(q => axios.get(q)))
  sessioncontents = sessioncontents
    .map(sescon => sescon.data)
    .reduce((a, b) => a.concat(b))

  return normalizeSessioncontentList(sessioncontents)
}

export const fetchSessioncontentsLikes = async ({ id, ...options }) => {
  let query = Object.entries(options)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
  const likes = await axios.get(`sessioncontents/${id}/likes/count?${query}`)
  return likes.data.total
}
