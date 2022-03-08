import { fromJS } from 'immutable'

import {
  LIKES_FETCH_SUCCESS,
  LIKE_CREATED_SUCCESS,
  LIKE_DELETED_SUCCESS,
  LIKE_UPDATED_SUCCESS
} from '../actions'

import {
  APPUSER_LIKES_FETCH
} from '../../appuser/actions'

const reducer = (state = fromJS({ loading: false }), action) => {
  switch (action.type) {
    case APPUSER_LIKES_FETCH:
      return state.set('loading', true)
    case LIKES_FETCH_SUCCESS:
      return state.mergeDeep(fromJS({
        loading: false,
        data: action.payload.likes
      }))
    case LIKE_CREATED_SUCCESS:
    case LIKE_UPDATED_SUCCESS:
      return state.mergeDeep(fromJS(action.payload.like))
    case LIKE_DELETED_SUCCESS:
      const likes = Object.keys(action.payload.like)
      return state.deleteAll(likes)
    default:
      return state
  }
}

export default reducer
