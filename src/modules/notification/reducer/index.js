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
      const newState = state.mergeDeep(
        fromJS({
          data: action.payload.notifications
        })
      )
      console.log(state.toJS(), newState.toJS())
      return newState

    case SET_NOTIFICATION_VIEWED:
      return state.setIn(['data', action.payload.notification, 'interacted'], true)

    case SET_INTERACTED_NOTIFICATION:
      console.log('set interacted notification', action.payload.notification)
      return state.set('lastInteracted', action.payload.notification)
    
    case CLEAR_INTERACTED_NOTIFICATION:
      console.log('clearing interacted notification')
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
