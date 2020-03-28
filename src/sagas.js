import { 
  all 
} from 'redux-saga/effects'

import {
  watchFethScript,
  watchFetchAvailableScripts
} from './modules/script/sagas'

import {
  watchCreateAppuser
} from './modules/appuser/sagas'


export default function* rootSaga() {
  yield all([
    watchFethScript(),
    watchFetchAvailableScripts(),
    watchCreateAppuser()
  ])
}
