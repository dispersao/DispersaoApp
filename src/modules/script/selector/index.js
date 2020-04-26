import { createSelector } from 'reselect'

const getState = (state) => state.script

export const getScriptState = createSelector(
  [getState], script => {
    if (!script || !script.size) {
      return
    }
    return script.get('state')
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

export const getAvailableScripts = createSelector(
  [getState], script => {
    if (!script || !script.size) {
      return
    }
    return script.get('availableScripts')
  }
)
