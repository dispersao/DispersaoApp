import { fromJS, Map } from 'immutable'

import {
  SESSIONCONTENTS_FETCH_SUCCESS
} from '../actions'

const reducer = (state = null, action) => {
  switch(action.type) {
    case SESSIONCONTENTS_FETCH_SUCCESS:
      return (state || new Map({})).mergeDeep(
        fromJS(action.payload.sessioncontents)
      )
    default:
      return state
  }
}

export default reducer
