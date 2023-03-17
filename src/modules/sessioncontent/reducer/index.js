import { fromJS, Map } from 'immutable'
import {optimistic} from 'redux-optimistic-ui'

import {
  SESSIONCONTENTS_FETCH_SUCCESS,
  SESSIONCONTENTS_FETCH,
  SESSIONCONTENT_VIEWED,
  SESSIONCONTENT_LIKES_FETCH,
  SESSIONCONTENT_LIKES_FETCH_SUCCESS
} from '../actions'

import {
  LIKE_CREATE,
  LIKE_UPDATE,
  LIKE_DELETE
} from '../../likes/actions'

const reducer = (state = Map({ loading: false, fetched_at: null }), action) => {
  let sessioncontent, dislike, field, value, field2, value2

  switch (action.type) {
    case SESSIONCONTENTS_FETCH:
      return state.set('loading', true)
    case SESSIONCONTENTS_FETCH_SUCCESS:
      return state.mergeDeep(
        fromJS({
          loading: false,
          fetched_at: action.payload.fetched_at,
          data: action.payload.sessioncontents
        })
      )

    case SESSIONCONTENT_LIKES_FETCH:
      return state.setIn(
        ['data', action.payload.sessioncontent.toString(), 'loading'],
        true
      )

    case SESSIONCONTENT_LIKES_FETCH_SUCCESS:
      return state.mergeDeep(
        fromJS({
          data: {
            [action.payload.sessioncontent.id]: {
              loading: false,
              ...action.payload.sessioncontent
            }
          }
        })
      )

    case LIKE_CREATE:
      dislike = action.payload.dislike
      sessioncontent = action.payload.sessioncontent.toString()

      field = dislike ? 'dislikes' : 'likes'
      value = state.getIn(['data', sessioncontent, field])

      return state.setIn(['data', sessioncontent, field], value + 1)

    case LIKE_UPDATE:
      dislike = action.payload.dislike
      sessioncontent = action.payload.sessioncontent.toString()

      field = dislike ? 'dislikes' : 'likes'
      field2 = dislike ? 'likes' : 'dislikes'

      value = state.getIn(['data', sessioncontent, field])
      value2 = state.getIn(['data', sessioncontent, field2])

      return state
        .setIn(['data', sessioncontent, field], value + 1)
        .setIn(['data', sessioncontent, field2], value2 - 1)

    case LIKE_DELETE:
      dislike = action.payload.dislike
      sessioncontent = action.payload.sessioncontent.toString()

      field = dislike ? 'dislikes' : 'likes'
      value = state.getIn(['data', sessioncontent, field])

      return state.setIn(
        ['data', sessioncontent, field],
        Math.max(value - 1, 0)
      )

    case SESSIONCONTENT_VIEWED:
      return state.setIn(
        ['data', action.payload.sessioncontent.toString(), 'viewed'],
        true
      )

    default:
      return state
  }
}

export default optimistic(reducer)
