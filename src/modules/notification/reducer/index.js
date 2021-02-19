import { fromJS, Map } from 'immutable'

import {
  ADD_NOTIFICATION,
  SET_NOTIFICATION_VIEWED,
  SET_INTERACTED_NOTIFICATION,
  CLEAR_INTERACTED_NOTIFICATION,
  SET_FOREGROUND_NOTIFICATION,
  CLEAR_FOREGROUND_NOTIFICATION
} from '../actions'

const reducer = (state = Map({lastInteracted: null, lastForeground: null}), action) => {
  switch(action.type) {
    
    case ADD_NOTIFICATION:
      return state.mergeDeep(
        fromJS({
          data: action.payload.notifications
        })
      )

    case SET_NOTIFICATION_VIEWED:
      return state.mergeDeep(
        fromJS({
          data: action.payload.notification
        })
      )

    case SET_INTERACTED_NOTIFICATION:
      return state.set('lastInteracted', action.payload.notification)
    
    case CLEAR_INTERACTED_NOTIFICATION:
      return state.set('lastInteracted', null)

    case SET_FOREGROUND_NOTIFICATION:
      return state.set('lastForeground', action.payload.notification)
    
    case CLEAR_FOREGROUND_NOTIFICATION:
      return state.set('lastForeground', null)
    
    default:
      return state
  }
}

export default reducer
