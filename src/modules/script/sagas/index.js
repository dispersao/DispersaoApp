import { 
  race,
  take,
  call,
  put, 
  takeLeading,
  delay
} from 'redux-saga/effects'

import {
  FETCH_AVAILABLE_SCRIPTS,
  POLL_FETCH_AVAILABLE_SCRIPTS,
  STOP_FETCH_AVAILABLE_SCRIPT,
  fetchAvailableScriptsSuccess,
  fetchAvailableScriptsError,
  stopFetchAvailableScripts,
} from '../actions'

import {
  fetchScript as fetchScriptAPI,
  fetchAvailableScript as fetchAvailabeScriptsAPI
} from '../api'

const POLLING_DELAY = 1000

export function* watchFetchAvailableScripts() {
  yield takeLeading(FETCH_AVAILABLE_SCRIPTS, fetchAvailableScripts)
}

export function* watchPollAvailableScripts() {
  while (true) {
      yield take(POLL_FETCH_AVAILABLE_SCRIPTS)
      yield race([call(pollAvailableScript), take(STOP_FETCH_AVAILABLE_SCRIPT)] )
  }
}

function* fetchAvailableScripts() {
  try {
    const scripts = yield fetchAvailabeScriptsAPI()
    yield put(fetchAvailableScriptsSuccess(scripts))
  } catch (e) {
    yield put(fetchAvailableScriptsError(e))
  }
}

function* pollAvailableScript() {
  while (true) {
      try {
          const scripts = yield fetchAvailabeScriptsAPI()
          yield put(fetchAvailableScriptsSuccess(scripts))
          yield delay(POLLING_DELAY)
      } catch (err) {
          yield put(fetchAvailableScriptsError(err))
          // Once the polling has encountered an error,
          // it should be stopped immediately
          yield put(stopFetchAvailableScripts())
      }
  }
}
