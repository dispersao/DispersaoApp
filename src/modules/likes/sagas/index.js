import { 
  put, 
  takeLeading,
  select,
  takeEvery
} from 'redux-saga/effects'

import {
  LIKE_CREATE,
  LIKE_UPDATE,
  LIKE_DELETE,
  likeCreatedSuccess,
  likeDeletedSuccess,
  likeUpdatedSuccess
} from '../actions'

import {
  sessioncontentLikesFetch
} from '../../sessioncontent/actions'

import {
  createLike as createLikeAPI,
  updateLike as updateLikeAPI,
  deleteLike as deleteLikeAPI
} from '../api'

import { getId as getAppuserId } from '../../appuser/selector'

export function* watchCreateDeleteUpdateLike() {
  yield takeEvery(LIKE_CREATE, createLike)
  yield takeEvery(LIKE_DELETE, deleteLike)
  yield takeEvery(LIKE_UPDATE, updateLike)
}

function* createLike(action) {
  try {
    const appuser = yield select(getAppuserId)
    const {entities} = yield createLikeAPI({
      ...action.payload.like,
      appuser
    })
    
    /*yield* Object.values(entities.likes).map(function*({sessioncontent}) {
      yield put(sessioncontentLikesFetch(sessioncontent))
    })*/
    yield put(likeCreatedSuccess(entities.likes)) 

  } catch (e) {
    console.log(e)
  }
}

function* deleteLike(action) {
  try {
    console.log('on delete')
    const {entities} = yield deleteLikeAPI(action.payload.like)
   
    /*yield* Object.values(entities.likes).map(function*({sessioncontent}) {
      yield put(sessioncontentLikesFetch(sessioncontent))
    })*/
    yield put(likeDeletedSuccess(entities.likes))
  } catch (e) {
    console.log(e)
  }
}

function* updateLike(action) {
  try {
    console.log('on update')
    const {entities} = yield updateLikeAPI(action.payload.like)
    /*yield* Object.values(entities.likes).map(function*({sessioncontent}) {
      yield put(sessioncontentLikesFetch(sessioncontent))
    })*/
    yield put (likeUpdatedSuccess(entities.likes))

  } catch (e) {
    console.log(e)
  }
}


