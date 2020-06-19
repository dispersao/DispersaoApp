import { 
  put, 
  takeLeading,
  select
} from 'redux-saga/effects'

import {
  FIND_APPUSER,
  CREATE_APPUSER,
  UPDATE_APPUSER,
  createAppuserSuccess,
  createAppuserError,
  findAppuserSuccess,
  updateAppuserSuccess,
  updateAppuserError,
  findAppuserError
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

export function* watchFindAppuser() {
  yield takeLeading(FIND_APPUSER, findAppuser)
}

export function* watchCreateAppuser() {
  yield takeLeading(CREATE_APPUSER, createAppuser)
}

export function* watchUpdateAppuser() {
  yield takeLeading(UPDATE_APPUSER, updateAppuser)
}

function* findAppuser(action) {
  try {
    let { result, entities: { appusers, scripts } } = yield findAppuserAPI(action.payload)
    const resultId = result && result.length ? result[0] : result
    if (resultId && appusers){
      console.log('finding user', scripts)
      if(scripts) {
        yield put(fetchScriptSuccess(scripts))
      }
      yield put(findAppuserSuccess(appusers[resultId]))
    }
  } catch (e) {
    const error = e?.response || e
    yield put(findAppuserError(error))
  }
}


function* createAppuser(action) {
  try {
    let { result, entities: { appusers } } = yield createAppuserAPI(action.payload)
    if (appusers){
      yield put(createAppuserSuccess(appusers[result]))
    }
  } catch (e) {
    const error = e?.response || e
    yield put(createAppuserError(error))
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
    const error = e?.response || e
    const message = updateAppuserError(error)
    yield put(message)
  }
}
