import { 
  put, 
  takeLeading,
  select
} from 'redux-saga/effects'

import {
  FIND_OR_CREATE_APPUSER,
  UPDATE_APPUSER,
  createAppuserSuccess,
  createAppuserError,
  findAppuserSuccess,
  updateAppuserSuccess,
  updateAppuserError
} from '../actions'

import {
  fetchScriptSuccess
} from '../../script/actions'

import {
  createAppuser as createAppuserAPI,
  findAppuser as findAppuserAPI,
  updateAppuser as updateAppuserAPI
} from '../api'

import { getId as getAppuserId } from '../selector'

export function* watchCreateAppuser() {
  yield takeLeading(FIND_OR_CREATE_APPUSER, findOrCreateAppUser)
}

export function* watchUpdateAppuser() {
  yield takeLeading(UPDATE_APPUSER, updateAppuser)
}

function* findOrCreateAppUser(action) {
  try {
    let {result, entities} = yield findAppuserAPI(action.payload.expotoken)
    if (result.length){
      yield put(findAppuserSuccess(entities.appusers[result[0]]))
      if(entities.scripts) {
        yield put(fetchScriptSuccess(entities.scripts))
      }
    } else {
      let { entities, result } = yield createAppuserAPI(action.payload)
      yield put(createAppuserSuccess(entities.appusers[result]))
    }
  } catch(e) {
    console.log(e)
    yield put(createAppuserError(e))
  }
}

function* updateAppuser(action) {
  try {
    const id = yield select(getAppuserId)
    let {entities, result} = yield updateAppuserAPI({
      id,
      ...action.payload.appuser
    })
    yield put(updateAppuserSuccess(entities.appusers[result]))
    if(entities.scripts) {
      yield put(fetchScriptSuccess(entities.scripts))
    }
  } catch(e) {
    console.log(e)
    yield put(updateAppuserError(e))
  }
}
