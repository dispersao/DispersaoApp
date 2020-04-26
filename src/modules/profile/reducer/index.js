import { fromJS } from 'immutable'

import {
  PROFILES_FETCH_SUCCESS
} from '../actions'

const reducer = (state = fromJS({
}), action) => {
  switch(action.type) {
    
    case PROFILES_FETCH_SUCCESS:
      return state.mergeDeep(
        fromJS(action.payload.profiles)
      )
    default:
      return state
  }
}

export default reducer
