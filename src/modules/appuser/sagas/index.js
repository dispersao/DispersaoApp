import { 
  put, 
  takeLeading 
} from 'redux-saga/effects'

import {
  CREATE_APPUSER,
  createAppuserSuccess,
  createAppuserError,
} from '../actions'

import {
  createAppuser as createAppuserAPI
} from '../api'

export function* watchCreateAppuser() {
  yield takeLeading(CREATE_APPUSER, createAppuser)
}

function* createAppuser(action) {
  try {
    const appuser = yield createAppuserAPI(action.payload)
    console.log(appuser)
    yield put(createAppuserSuccess(appuser))
  } catch (e) {
    console.log(e)
    yield put(createAppuserError(e))
  }
}
