import { 
  race,
  take,
  call,
  put, 
  takeLeading,
  delay
} from 'redux-saga/effects'

import {
  FETCH_SCRIPT,
  fetchScriptSuccess,
  FETCH_AVAILABLE_SCRIPTS,
  fetchAvailableScriptsSuccess,
  fetchAvailableScriptsError,
  stopFetchAvailableScripts,
  STOP_FETCH_AVAILABLE_SCRIPT
} from '../actions'

import {
  fetchScript as fetchScriptAPI,
  fetchAvailableScript as fetchAvailabeScriptsAPI
} from '../api'

const POLLING_DELAY = 1000

export function* watchFethScript() {
  yield takeLeading(FETCH_SCRIPT, fetchScript)
}

export function* watchFetchAvailableScripts() {
  while (true) {
      yield take(FETCH_AVAILABLE_SCRIPTS)
      yield race([call(fetchAvailableScript), take(STOP_FETCH_AVAILABLE_SCRIPT)] )
  }
}


function* fetchScript() {
  try {
    const scripts = yield fetchScriptAPI()
    yield put(fetchScriptSuccess(scripts))
  } catch (e) {
    console.log(e)
  }
}

function* fetchAvailableScript() {
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
