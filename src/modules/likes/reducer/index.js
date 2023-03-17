import { fromJS } from 'immutable'
import { optimistic } from 'redux-optimistic-ui'

import {
  LIKES_FETCH_SUCCESS,
  LIKE_CREATE,
  LIKE_DELETE,
  LIKE_UPDATE,
  LIKE_CREATE_SUCCESS
} from '../actions'

import { APPUSER_LIKES_FETCH } from '../../appuser/actions'

const reducer = (state = fromJS({ loading: false }), action) => {
  switch (action.type) {
    case APPUSER_LIKES_FETCH:
      return state.set('loading', true)
    case LIKES_FETCH_SUCCESS:
      return state.mergeDeep(
        fromJS({
          loading: false,
          data: action.payload.likes
        })
      )
    case LIKE_CREATE:
      return state.setIn(
        ['data', action.payload.id.toString()],
        fromJS(action.payload)
      )
    case LIKE_UPDATE:
      return state.mergeDeepIn(
        ['data', action.payload.id.toString()],
        fromJS(action.payload)
      )
    case LIKE_DELETE:
      return state.deleteIn(['data', action.payload.id.toString()])
    case LIKE_CREATE_SUCCESS:
      const newId = Object.keys(action.payload.result)[0]
      const oldId = action.payload.original.id.toString()
      let hasOldLike = state.hasIn(['data', oldId])

      if (hasOldLike) {
        return state
          .setIn(
            ['data', newId.toString()],
            state.getIn(['data', oldId]).set('id', newId)
          )
          .deleteIn(['data', action.payload.original.id.toString()])
      } else {
        return state
      }
    default:
      return state
  }
}

export default optimistic(reducer)
