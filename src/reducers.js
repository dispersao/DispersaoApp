import { combineReducers } from 'redux'

import script from './modules/script/reducer'
import appuser from './modules/appuser/reducer'
import contentcreators from './modules/contentcreator/reducer'
import posts from './modules/post/reducer'
import comments from './modules/comment/reducer'
import profiles from './modules/profile/reducer'
import sessioncontents from './modules/sessioncontent/reducer'

const reducer = combineReducers({
  script,
  appuser,
  contentcreators,
  posts,
  comments,
  profiles,
  sessioncontents
})

export default reducer
