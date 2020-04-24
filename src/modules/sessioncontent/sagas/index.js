import { 
  put, 
  takeLeading,
  select
} from 'redux-saga/effects'

import {
  SESSIONCONTENTS_FETCH,
  sessioncontentsFetchSuccess,
  sessioncontentsFetchError,
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
  fetchSessioncontents as fetchSessioncontentsAPI
} from '../api'

export function* watchSessioncontentsFetch() {
  yield takeLeading(SESSIONCONTENTS_FETCH, findSessioncontents)
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
    let { entities} = yield fetchSessioncontentsAPI({
      script,
      ...action.payload
    })
    yield mapSuccess(entities)
  } catch(e) {
    console.log(e)
    yield put(sessioncontentsFetchError(e))
  }
}


function* mapSuccess (entities) {
  function* map(key) {
    try{
      const action = entitiesMap[key](entities[key])
      yield put(action)
    } catch (e) {
      console.log(e)
    }
  }
  yield* Object.keys(entities).map(map)
}

