import { combineReducers } from 'redux'

import script from './modules/script/reducer'
import appuser from './modules/appuser/reducer'

const reducer = combineReducers({
  script,
  appuser
})

export default reducer
