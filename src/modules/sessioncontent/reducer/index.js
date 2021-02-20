import { fromJS, Map } from 'immutable'

import {
  SESSIONCONTENTS_FETCH_SUCCESS,
  SESSIONCONTENTS_FETCH
} from '../actions'

import {
  LIKE_CREATED_SUCCESS
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
    case LIKE_CREATED_SUCCESS:
      let newState = state
      const likes = Object.values(action.payload.like)
      likes.forEach(l => {
        let likesList = state.getIn(['data', l.sessioncontent.toString(), 'likes']).push(l.id)
        newState = newState.setIn(['data', l.sessioncontent.toString(), 'likes'], likesList)
        })
      return newState.set('loading', false)
    default:
      return state
  }
}

export default reducer
