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
    console.log('looking for user', action.payload)
    let { result, entities: { appusers, scripts } } = yield findAppuserAPI(action.payload)
    const resultId = result && result.length ? result[0] : result
    if (resultId && appusers){
      if(scripts) {
        yield put(fetchScriptSuccess(scripts))
      }
      console.log('found user ', appusers[resultId])
      yield put(findAppuserSuccess(appusers[resultId]))
    } else {
      yield put(findAppuserError({message: 'cant find any matching users'}))
      console.log('error finding user with token',  action.payload)
    }
  } catch (e) {
    const error = e?.response || e
    console.log('error finding user', error)
    yield put(findAppuserError(error))
  }
}


function* createAppuser(action) {
  try {
    console.log('crating user ',action.payload)
    let { result, entities: { appusers } } = yield createAppuserAPI(action.payload)
    if (appusers){
      console.log('user created ', appusers[result])
      yield put(createAppuserSuccess(appusers[result]))
    }
  } catch (e) {
    const error = e?.response || e
    console.log('error creating user', error)
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
    console.log('error updating user', error)
    yield put(updateAppuserError(error))
  }
}
