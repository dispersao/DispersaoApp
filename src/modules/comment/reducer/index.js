import { fromJS } from 'immutable'

import {
  COMMENTS_FETCH_SUCCESS
} from '../actions'

const reducer = (state = fromJS({
}), action) => {
  switch(action.type) {
    case COMMENTS_FETCH_SUCCESS:
      return state.mergeDeep(
        fromJS(action.payload.comments)
      )
    default:
      return state
  }
}

export default reducer
