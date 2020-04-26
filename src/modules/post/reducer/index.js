import { fromJS } from 'immutable'

import {
  POSTS_FETCH_SUCCESS
} from '../actions'

const reducer = (state = fromJS({
}), action) => {
  switch(action.type) {
    
    case POSTS_FETCH_SUCCESS:
      return state.mergeDeep(
        fromJS(action.payload.posts)
      )
    default:
      return state
  }
}

export default reducer
