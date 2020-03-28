import { 
  put, 
  takeLeading 
} from 'redux-saga/effects'

import {
  FIND_OR_CREATE_APPUSER,
  createAppuserSuccess,
  createAppuserError,
  findAppuserSuccess
} from '../actions'

import {
  createAppuser as createAppuserAPI,
  findAppuser as findAppuserAPI
} from '../api'

export function* watchCreateAppuser() {
  yield takeLeading(FIND_OR_CREATE_APPUSER, findOrCreateAppUser)
}

function* findOrCreateAppUser(action) {
  try {
    let appusers = yield findAppuserAPI(action.payload.expotoken)
    if (appusers.length){
      yield put(findAppuserSuccess(appusers[0]))
    } else {
      let appuser = yield createAppuserAPI(action.payload)
      yield put(createAppuserSuccess(appuser))
    }
  } catch (e) {
    console.log(e)
    yield put(createAppuserError(e))
  }
}
