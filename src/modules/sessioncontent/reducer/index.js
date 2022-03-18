import { fromJS, Map } from 'immutable'

import {
  SESSIONCONTENTS_FETCH_SUCCESS,
  SESSIONCONTENTS_FETCH,
  SESSIONCONTENT_VIEWED,
  SESSIONCONTENT_LIKES_FETCH,
  SESSIONCONTENT_LIKES_FETCH_SUCCESS
} from '../actions'


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
      
    case SESSIONCONTENT_VIEWED:
      return state.setIn(['data', action.payload.sessioncontent.toString(), 'viewed'], true)

    default:
      return state
  }
}

export default reducer
