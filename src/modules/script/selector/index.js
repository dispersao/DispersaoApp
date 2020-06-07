import { createSelector } from 'reselect'

export const getState = (state) => state.scripts

export const getLoaded = createSelector(
  [getState], script => {
    if (!script || !script.size) {
      return
    }
    return script.get('loaded')
  }
)

export const getAvailableScripts = createSelector(
  [getState], script => {
    if (!script || !script.size) {
      return
    }
    return script.get('availableScripts')
  }
)
