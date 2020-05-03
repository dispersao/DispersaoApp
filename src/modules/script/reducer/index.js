import { fromJS } from 'immutable'

import {
  FETCH_SCRIPT_SUCCESS,
  FETCH_AVAILABLE_SCRIPTS_SUCCESS
} from '../actions'
let script
const reducer = (state = fromJS({
  loaded: false
}), action) => {
  switch(action.type) {
    
    case FETCH_SCRIPT_SUCCESS:
      if (action.payload.scripts.length){
        script = action.payload.scripts[action.payload.scripts.length - 1]
        return state.mergeDeep(fromJS({
          id: script.id,
          token: script.token,
          loaded: true
        })
        )
      } else {
        return state.mergeDeep(fromJS(
          {
            loaded: true
          })
        )
      }

      case FETCH_AVAILABLE_SCRIPTS_SUCCESS:
        return state.mergeDeep(fromJS({
          availableScripts: action.payload
        }))
      
    default:
      return state
  }
}

export default reducer