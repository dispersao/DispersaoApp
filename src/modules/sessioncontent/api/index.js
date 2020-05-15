import axios from 'axios'
import config from '../../../../config.json'

import {
  normalizeSessioncontentList
} from '../schema'

axios.defaults.baseURL = config.api.url
axios.defaults.headers.post['Content-Type'] = 'json'

export const fetchSessioncontents = async ({ script, types = [] }) => {
  let query = `sessioncontents?script.token=${script}`
  let queries = []
  if (types.length) {
    queries = types.map(t => `${query}&${t}_null`)
  } else {
    queries.push(query)
  }
  let sessioncontents = await Promise.all(queries.map(q => axios.get(q)))
  sessioncontents = sessioncontents
    .map(sescon => sescon.data)
    .reduce((a, b) => a.concat(b))
    
  return normalizeSessioncontentList(sessioncontents)
}
