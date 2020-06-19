import { fromJS } from 'immutable'

import {
  CREATE_APPUSER_SUCCESS,
  FIND_APPUSER_SUCCESS,
  FIND_APPUSER_ERROR,
  UPDATE_APPUSER_SUCCESS,
  CREATE_APPUSER_ERROR,
  UPDATE_APPUSER_ERROR
} from '../actions'

const reducer = (state = fromJS({
  data: null, error: null
}), action) => {
  switch(action.type) {
    
    case CREATE_APPUSER_SUCCESS:
    case FIND_APPUSER_SUCCESS:
    case UPDATE_APPUSER_SUCCESS:
      return state.mergeDeep(
        fromJS({
          data: action.payload.appuser,
          error: null
        })
      )
    case UPDATE_APPUSER_ERROR:
    case CREATE_APPUSER_ERROR:
    case FIND_APPUSER_ERROR:
      return state.mergeDeep(
        fromJS({
          error: {
            ...action.payload.error,
            type: action.type
          }
        })
      )
    default:
      return state
  }
}

export default reducer
