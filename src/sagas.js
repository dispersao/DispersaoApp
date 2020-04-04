import { 
  all 
} from 'redux-saga/effects'

import {
  watchPollAvailableScripts,
  watchFetchAvailableScripts
} from './modules/script/sagas'

import {
  watchCreateAppuser,
  watchUpdateAppuser
} from './modules/appuser/sagas'


export default function* rootSaga() {
  yield all([
    watchFetchAvailableScripts(),
    watchPollAvailableScripts(),
    watchCreateAppuser(),
    watchUpdateAppuser()
  ])
}
