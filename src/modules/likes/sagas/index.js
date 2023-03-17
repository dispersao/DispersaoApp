import { put, takeLeading, select, takeEvery } from 'redux-saga/effects'

import {
  LIKE_CREATE,
  LIKE_UPDATE,
  LIKE_DELETE,
  likeCreateSuccess,
  likeDeleteSuccess,
  likeUpdatedSuccess,
  likeCreateError,
  likeDeleteError,
  likeUpdatedError
} from '../actions'

import {
  createLike as createLikeAPI,
  updateLike as updateLikeAPI,
  deleteLike as deleteLikeAPI,
  sleep
} from '../api'

import { getId as getAppuserId } from '../../appuser/selector'

let taskQueue = {}

export function* watchCreateDeleteUpdateLike() {
  yield takeEvery(LIKE_CREATE, createLike)
  yield takeEvery(LIKE_DELETE, deleteLike)
  yield takeEvery(LIKE_UPDATE, updateLike)
}

function* createLike(action) {
  const appuser = yield select(getAppuserId)
  const key = action.payload.sessioncontent

  yield addToQueue({
    action:{
      ...action,
      payload: {
        ...action.payload,
        appuser
      }
    },
    api: createLikeAPI,
    success: function*(result){
      updateQueue({
        key,
        previousId: action.payload.id,
        newId: Object.values(result)[0].id,
      });
      yield successFactory(action, likeCreateSuccess)(result)
    },
    error: errorFactory(action, likeCreateError, key)
  }, key)
}

function* deleteLike(action) {
  const key = action.payload.sessioncontent

  yield addToQueue({
    action,
    api: deleteLikeAPI,
    success: successFactory(action, likeDeleteSuccess),
    error: errorFactory(action, likeDeleteError, key)
  }, key)
}

function* updateLike(action) {
  const key = action.payload.sessioncontent

  yield addToQueue({
    action,
    api: updateLikeAPI,
    success: successFactory(action, likeUpdatedSuccess),
    error: errorFactory(action, likeUpdatedError, key)
  }, key)
}

const successFactory = (originalAction, successAction) => {
  const {
    payload,
    meta: {
      optimistic: { id }
    }
  } = originalAction
  return function* (result) {
    yield put(
      successAction(
        {
          result,
          original: payload
        },
        id
      )
    )
  }
}

const errorFactory = (originalAction, errorAction, key) => {
  const {
    payload,
    meta: {
      optimistic: { id }
    }
  } = originalAction
  return function* (error) {
    yield put(
      errorAction(
        {
          error,
          original: payload
        },
        id
      )
    )
  }
}

function* addToQueue(actionHash, key) {
  taskQueue[key] = taskQueue[key] || []
  taskQueue[key].push(actionHash)
  if (taskQueue[key].length === 1) {
    yield executeAction(actionHash, key)
  }
}

function* executeAction(actionHash, key) {
  const { action: { type, payload }, api, success } = actionHash
  try {
    const { entities } = yield api(payload)
    removeFromQueue(actionHash, key)
    yield success(entities.likes)
  } catch (e) {
    console.log('Error executing', type, e)
    yield* taskQueue[key].reverse().map(function*(ah){
      removeFromQueue(ah, key)
      yield ah.error(e)
    })
  }

  if (taskQueue[key].length) {
    yield executeAction(taskQueue[key][0], key)
  }
}

const removeFromQueue = (actionHash, key) => {
  const index = taskQueue[key].indexOf(actionHash)
  if(index > -1){
    taskQueue[key].splice(index, 1)
  }
}

const updateQueue = ({ key, previousId, newId }) => {
  taskQueue[key] = taskQueue[key].map((task) => ({
    ...task,
    action: {
      ...task.action,
      payload: {
        ...task.action.payload, 
        id:
          task.action.payload.id === previousId
            ? newId
            : task.action.payload.id
      },
    },
  }));
};
