import { 
  put, 
  takeLeading,
  select
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
  createLike as createLikeAPI,
  updateLike as updateLikeAPI,
  deleteLike as deleteLikeAPI,
} from '../api'

import { getId as getAppuserId } from '../../appuser/selector'

export function* watchCreateDeleteUpdateLike() {
  yield takeLeading(LIKE_CREATE, createLike)
  yield takeLeading(LIKE_DELETE, deleteLike)
  yield takeLeading(LIKE_UPDATE, updateLike)
}

function* createLike(action) {
  try {
    const appuser = yield select(getAppuserId)
    const {entities} = yield createLikeAPI({
      ...action.payload.like,
      appuser
    })
    yield put(likeCreatedSuccess(entities.likes))
  } catch (e) {
    console.log(e)
  }
}

function* deleteLike(action) {
  try {
    const {entities} = yield deleteLikeAPI(action.payload.like)
    yield put(likeDeletedSuccess(entities.likes))
  } catch (e) {
    console.log(e)
  }
}

function* updateLike(action) {
  try {
    const {entities} = yield updateLikeAPI(action.payload.like)
    yield put (likeUpdatedSuccess(entities.likes))
  } catch (e) {
    console.log(e)
  }
}
