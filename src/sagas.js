import { 
  all 
} from 'redux-saga/effects'

import {
  watchPollAvailableScripts,
  watchFetchAvailableScripts
} from './modules/script/sagas'

import {
  watchCreateAppuser,
  watchFindAppuser,
  watchUpdateAppuser  
} from './modules/appuser/sagas'

import {
  watchSessioncontentsFetch
} from './modules/sessioncontent/sagas'

import {
  watchCreateDeleteUpdateLike
} from './modules/likes/sagas'

export default function* rootSaga() {
  yield all([
    watchFetchAvailableScripts(),
    watchPollAvailableScripts(),
    watchCreateAppuser(),
    watchFindAppuser(),
    watchUpdateAppuser(),
    watchSessioncontentsFetch(),
    watchCreateDeleteUpdateLike()
  ])
}
