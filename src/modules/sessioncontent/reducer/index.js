import { fromJS, Map } from 'immutable'

import {
  SESSIONCONTENTS_FETCH_SUCCESS,
} from '../actions'

import {
  LIKE_CREATED_SUCCESS
} from '../../likes/actions'

const reducer = (state = null, action) => {
  switch(action.type) {
    case SESSIONCONTENTS_FETCH_SUCCESS:
      return (state || new Map({})).mergeDeep(
        fromJS(action.payload.sessioncontents)
      )
    case LIKE_CREATED_SUCCESS:
      let newState = state
      const likes = Object.values(action.payload.like)
      likes.forEach(l => {
        let likesList = state.getIn([l.sessioncontent.toString(), 'likes']).push(l.id)
        newState = newState.setIn([l.sessioncontent.toString(), 'likes'], likesList)
        })
      return newState
    default:
      return state
  }
}

export default reducer
