import { createSelector } from 'reselect'

import { getState as getScripts} from '../../script/selector'

const getState = (state) => state.appuser

export const getLoading = (state) => state.appuser.get('loading')

const getStateData = createSelector(
  [getState], appuser => appuser.get('data')
)

export const getId = createSelector(
  [getStateData], appuser => {
    if (!appuser || !appuser.size) {
      return
    }
    return appuser.get('id')
  }
)

export const getExpotoken = createSelector(
  [getStateData], appuser => {
    if (!appuser || !appuser.size) {
      return
    }
    return appuser.get('expotoken')
  }
)

export const getCurrentUserScript = createSelector(
  [getStateData, getScripts],
  (appuser, scripts) => {
    if (!appuser || !appuser.size) {
      return
    }
    return scripts.get(appuser.get('script'))
  }
)

export const getScript = createSelector(
  [getStateData], appuser => {
    if (!appuser || !appuser.size) {
      return
    }
    return appuser.get('script')
  }
)

export const getError = createSelector(
  [getState], appuser => {
    if (!appuser || !appuser.size) {
      return
    }
    return appuser.get('error')
  }
)
