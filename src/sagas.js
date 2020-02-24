import { 
  all 
} from 'redux-saga/effects'

import {
  watchFetchConfig,
  watchFethScript
} from './modules/script/sagas'


export default function* rootSaga() {
  yield all([
    watchFetchConfig(),
    watchFethScript()
  ])
}
