import axios from 'axios'
import config from '../../../../config.json'


axios.defaults.baseURL = config.api.url
axios.defaults.headers.post['Content-Type'] = 'json'

export const fetchScript = async () => {
  const script = await axios.get('scripts?state=started')
  return script.data
}

export const fetchAvailableScript = async() => {
  const acceptedStates = ['started', 'playing', 'paused']
  const query = acceptedStates.map(state => `state_in=${state}`).join('&')
  const availableScripts = await axios.get(`scripts/count?${query}`)
  return availableScripts.data
}
