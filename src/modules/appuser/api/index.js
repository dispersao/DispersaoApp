import axios from 'axios'
import config from '../../../../config.json'

if (axios.defaults.baseURL) {
  axios.defaults.baseURL = config.api.url
  axios.defaults.headers.post['Content-Type'] = 'json'
}

export const createAppuser = async (appuser) => {
  const user = await axios.post('/appusers', appuser)
  return user.data
}
