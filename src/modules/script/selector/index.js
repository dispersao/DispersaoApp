import { createSelector } from 'reselect'

const getState = (state) => state.script

export const getToken = createSelector(
  [getState], script => {
    if (!script || !script.size) {
      return
    }
    return script.get('token')
  }
)

export const getLoaded = createSelector(
  [getState], script => {
    if (!script || !script.size) {
      return
    }
    return script.get('loaded')
  }
)
