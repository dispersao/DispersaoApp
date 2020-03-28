import { fromJS } from 'immutable'

import {
  CREATE_APPUSER_SUCCESS,
  FIND_APPUSER_SUCCESS,
  CREATE_APPUSER_ERROR
} from '../actions'
let uappuser
const reducer = (state = fromJS({
}), action) => {
  switch(action.type) {
    
    case CREATE_APPUSER_SUCCESS:
    case FIND_APPUSER_SUCCESS:
      return state.mergeDeep(
        fromJS(action.payload.appuser)
      )
    case CREATE_APPUSER_ERROR:
      return state.mergeDeep(
        fromJS(action.payload.error)
      )
    default:
      return state
  }
}

export default reducer
