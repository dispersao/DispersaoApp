import { 
  put, 
  takeLeading 
} from 'redux-saga/effects'

import {
  FETCH_CONFIG,
  FETCH_SCRIPT,
  fetchConfigSuccess,
  fetchScriptSuccess,
} from '../actions'

import {
  fetchScript as fetchScriptAPI
} from '../api'

export function* watchFetchConfig() {
  yield takeLeading(FETCH_CONFIG, fetchConfig)
}

export function* watchFethScript() {
  yield takeLeading(FETCH_SCRIPT, fetchScript)
}

function* fetchConfig(action) {
  const config = yield fetchConfigAPI()
  yield put(fetchConfigSuccess(config))
}

function* fetchScript() {
  try {
    const scripts = yield fetchScriptAPI()
    yield put(fetchScriptSuccess(scripts))
  } catch (e) {
    console.log(e)
  }
  
}
