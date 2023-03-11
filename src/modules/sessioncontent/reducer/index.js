import { fromJS, Map } from 'immutable'

import {
  SESSIONCONTENTS_FETCH_SUCCESS,
  SESSIONCONTENTS_FETCH,
  SESSIONCONTENT_VIEWED,
  SESSIONCONTENT_LIKES_FETCH,
  SESSIONCONTENT_LIKES_FETCH_SUCCESS
} from '../actions'

import {
  LIKE_CREATED_SUCCESS,
  LIKE_UPDATED_SUCCESS,
  LIKE_DELETED_SUCCESS
} from '../../likes/actions'


const reducer = (state = Map({loading: false, fetched_at: null}), action) => {
  switch(action.type) {
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
      return state.setIn(['data', action.payload.sessioncontent.toString(), 'loading'], true)
    
    case SESSIONCONTENT_LIKES_FETCH_SUCCESS:
      return state.mergeDeep(fromJS({
        data: {
          [action.payload.sessioncontent.id]: {
            loading: false,
            ...action.payload.sessioncontent
          }
        }
      }))

    case LIKE_CREATED_SUCCESS:
      Object.values(action.payload.like).forEach(({ sessioncontent, dislike }) => {
        const field = dislike ? 'dislikes' : 'likes'
        const value = state.getIn(['data', sessioncontent.toString(), field])
        state = state.mergeDeep(fromJS({
          data: {
            [sessioncontent.toString()]: {
              [field]: value + 1
            }
          }
        }))
      })
      return state

    case LIKE_UPDATED_SUCCESS:
      Object.values(action.payload.like).forEach(({ sessioncontent, dislike }) => {
        const field1 = dislike ? 'dislikes' : 'likes'
        const field2 = dislike ? 'likes' : 'dislikes'
        const value1 = state.getIn(['data', sessioncontent.toString(), field1])
        const value2 = state.getIn(['data', sessioncontent.toString(), field2])
        
        state = state.mergeDeep(fromJS({
          data: {
            [sessioncontent.toString()]: {
              [field1]: value1 + 1,
              [field2]: value2 - 1
            }
          }
        }))
      })
      return state

    case LIKE_DELETED_SUCCESS:
      Object.values(action.payload.like).forEach(({ sessioncontent, dislike }) => {
        const field = dislike ? 'dislikes' : 'likes'
        const value = state.getIn(['data', sessioncontent.toString(), field])
        state = state.mergeDeep(fromJS({
          data: {
            [sessioncontent.toString()]: {
              [field]: Math.max(value - 1, 0)
            }
          }
        }))
      })
      return state

    case SESSIONCONTENT_VIEWED:
      return state.setIn(['data', action.payload.sessioncontent.toString(), 'viewed'], true)

    default:
      return state
  }
}

export default reducer
