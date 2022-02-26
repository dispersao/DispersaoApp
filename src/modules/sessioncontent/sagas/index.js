import { 
  put, 
  takeLeading,
  select,
  takeEvery
} from 'redux-saga/effects'

import {
  SESSIONCONTENTS_FETCH,
  sessioncontentsFetchSuccess,
  sessioncontentsFetchError,
  SESSIONCONTENT_LIKES_FETCH,
  sessioncontentLikesFetchSuccess,
  sessioncontentLikesFetchError
} from '../actions'

import {
  getScript
} from '../../appuser/selector'

import { postsFetchSuccess } from '../../post/actions'
import { commentsFetchSuccess } from '../../comment/actions'
import { profilesFetchSuccess } from '../../profile/actions'
import { contentcreatorsFetchSuccess } from '../../contentcreator/actions'
import { likesFetchSuccess } from '../../likes/actions'

import {
  fetchSessioncontents as fetchSessioncontentsAPI,
  fetchSessioncontentsLikes as fetchSessioncontentsLikesAPI
} from '../api'

export function* watchSessioncontentsFetch() {
  yield takeLeading(SESSIONCONTENTS_FETCH, findSessioncontents)
  yield takeEvery(SESSIONCONTENT_LIKES_FETCH, findSessioncontentsLikes)
}

const entitiesMap = {
  sessioncontents: sessioncontentsFetchSuccess,
  contentcreators: contentcreatorsFetchSuccess,
  posts: postsFetchSuccess,
  comments: commentsFetchSuccess,
  profiles: profilesFetchSuccess,
  likes: likesFetchSuccess
}

function* findSessioncontents(action) {
  try {
    const script = yield select(getScript)
    let { entities } = yield fetchSessioncontentsAPI({
      script,
      ...action.payload
    })
    entities.sessioncontents = entities.sessioncontents || {}
    yield mapSuccess(entities, { fetched_at: performance.now() })
  } catch(e) {
    console.log(e)
    yield put(sessioncontentsFetchError(e))
  }
}

function* findSessioncontentsLikes(action){
  try {
    const id = action.payload.sessioncontent
    const likes = yield fetchSessioncontentsLikesAPI({id, dislike: 0})
    const dislikes = yield fetchSessioncontentsLikesAPI({id, dislike: 1})
    yield put(sessioncontentLikesFetchSuccess({id, likes, dislikes}))
  } catch (e) {
    yield put(sessioncontentLikesFetchError(e))
  }
}


function* mapSuccess (entities, params) {
  function* map(key) {
    try{
      const action = entitiesMap[key](entities[key], params)
      yield put(action)
    } catch (e) {
      console.log(e)
    }
  }
  yield* Object.keys(entities).map(map)
}

