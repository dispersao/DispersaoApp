import axios from 'axios'
import config from '../../../../config.json'


axios.defaults.baseURL = config.api.url
axios.defaults.headers.post['Content-Type'] = 'json'

export const fetchScript = async () => {
  const script = await axios.get('scripts?state=started')
  return script.data
}
