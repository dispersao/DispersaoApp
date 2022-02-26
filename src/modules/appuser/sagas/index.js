import { 
  put, 
  takeLeading,
  select
} from 'redux-saga/effects'

import {
  FIND_APPUSER,
  CREATE_APPUSER,
  UPDATE_APPUSER,
  APPUSER_LIKES_FETCH,
  createAppuserSuccess,
  createAppuserError,
  findAppuserSuccess,
  updateAppuserSuccess,
  updateAppuserError,
  findAppuserError,
  findAppuserLikesError
} from '../actions'

import {
  fetchLikesSucces
} from '../../likes/actions'

import {
  fetchScriptSuccess
} from '../../script/actions'

import {
  createAppuser as createAppuserAPI,
  findAppuser as findAppuserAPI,
  updateAppuser as updateAppuserAPI,
  findApppuserLikes as findAppuserLikesAPI
} from '../api'

import { getId as getAppuserId } from '../selector'

export function* watchFindAppuser() {
  yield takeLeading(FIND_APPUSER, findAppuser)
  yield takeLeading(APPUSER_LIKES_FETCH, findAppusersLikes)
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
      if(scripts) {
        yield put(fetchScriptSuccess(scripts))
      }
      yield put(findAppuserSuccess(appusers[resultId]))
    } else {
      yield put(findAppuserError({message: 'cant find any matching users'}))
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
    yield put(updateAppuserError(error))
  }
}

function* findAppusersLikes() {
  try {
    const id = yield select(getAppuserId)
    const { entities } = yield findAppuserLikesAPI({ id })
    yield put(fetchLikesSucces(entities.likes))
  } catch(e) {
    console.log(e)
    const error = e?.response || e
    yield put(findAppuserLikesError(error))
  }
}
