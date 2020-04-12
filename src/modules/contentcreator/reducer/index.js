import { fromJS } from 'immutable'

import {
  CONTENTCREATORS_FETCH_SUCCESS
} from '../actions'

const reducer = (state = fromJS({
}), action) => {
  switch(action.type) {
    
    case CONTENTCREATORS_FETCH_SUCCESS:
      return state.mergeDeep(
        fromJS(action.payload.contentcreators)
      )
    default:
      return state
  }
}

export default reducer
