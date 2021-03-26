import { 
  race,
  take,
  call,
  put, 
  takeLeading,
  delay,
  select
} from 'redux-saga/effects'

import {
  FETCH_AVAILABLE_SCRIPTS,
  POLL_FETCH_AVAILABLE_SCRIPTS,
  STOP_FETCH_AVAILABLE_SCRIPT,
  fetchAvailableScriptsSuccess,
  fetchAvailableScriptsError,
  stopFetchAvailableScripts,

  POLL_FETCH_SCRIPT_STATE,
  STOP_FETCH_SCRIPT_STATE,
  fetchScriptStateSuccess,
  fetchScriptStateError,
  stopFetchScriptState
} from '../actions'

import {
  fetchAvailableScript as fetchAvailabeScriptsAPI,
  fetchScriptState as fetchScriptStateAPI
} from '../api'

import {
  getScript
} from '../../appuser/selector'

const AVAILABLE_SCRIPT_POLLING_DELAY = 1000
const SCRIPT_STATE_POLLING_DELAY = 10000

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
          yield delay(AVAILABLE_SCRIPT_POLLING_DELAY)
      } catch (err) {
          yield put(fetchAvailableScriptsError(err))
          // Once the polling has encountered an error,
          // it should be stopped immediately
          yield put(stopFetchAvailableScripts())
      }
  }
}


export function* watchPollScriptState() {
  while (true) {
      yield take(POLL_FETCH_SCRIPT_STATE)
      yield race([call(pollFetchScriptState), take(STOP_FETCH_SCRIPT_STATE)] )
  }
}

function* pollFetchScriptState() {
  const token = yield select(getScript)
  while (true) {
    try {
      const { entities: { scripts } } = yield fetchScriptStateAPI({ token })
      yield put(fetchScriptStateSuccess(scripts))
      yield delay(SCRIPT_STATE_POLLING_DELAY)
    } catch(err) {
      console.log(err);
      yield put(fetchScriptStateError(err))
      // Once the polling has encountered an error,
      // it should be stopped immediately
      yield put(stopFetchScriptState())
    }
  }
}
