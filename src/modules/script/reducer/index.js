import { fromJS } from 'immutable'

import {
  FETCH_SCRIPT_SUCCESS,
  FETCH_AVAILABLE_SCRIPTS_SUCCESS,
  FFETCH_SCRIPT_STATE_SUCCESS
} from '../actions'
let script
const reducer = (
  state = fromJS({
    loaded: false
  }),
  action
) => {
  switch (action.type) {
    case FETCH_SCRIPT_SUCCESS:
    case FFETCH_SCRIPT_STATE_SUCCESS:
      if (Object.keys(action.payload.scripts).length) {
        return state.mergeDeep(
          fromJS({
            ...action.payload.scripts,
            loaded: true
          })
        )
      } else {
        return state.mergeDeep(
          fromJS({
            loaded: true
          })
        )
      }

    case FETCH_AVAILABLE_SCRIPTS_SUCCESS:
      return state.mergeDeep(
        fromJS({
          availableScripts: action.payload
        })
      )

    default:
      return state
  }
}

export default reducer
