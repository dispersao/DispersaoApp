import { fromJS } from 'immutable'

import {
  LIKES_FETCH_SUCCESS,
  LIKE_CREATED_SUCCESS,
  LIKE_DELETED_SUCCESS,
  LIKE_UPDATED_SUCCESS
} from '../actions'

const reducer = (state = fromJS({
}), action) => {
  switch(action.type) {
    case LIKES_FETCH_SUCCESS:
      return state.mergeDeep(
        fromJS(action.payload.likes)
      )
    case LIKE_CREATED_SUCCESS:
    case LIKE_UPDATED_SUCCESS:
      return state.mergeDeep(
        fromJS(action.payload.like)
      )
    case LIKE_DELETED_SUCCESS:
      const likes = Object.keys(action.payload.like)
      return state.deleteAll(likes)
    default:
      return state
  }
}

export default reducer
