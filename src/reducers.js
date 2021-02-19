import { combineReducers } from 'redux'

import scripts from './modules/script/reducer'
import appuser from './modules/appuser/reducer'
import contentcreators from './modules/contentcreator/reducer'
import posts from './modules/post/reducer'
import comments from './modules/comment/reducer'
import profiles from './modules/profile/reducer'
import sessioncontents from './modules/sessioncontent/reducer'
import likes from './modules/likes/reducer'
import notifications from './modules/notification/reducer'

const reducer = combineReducers({
  scripts,
  appuser,
  contentcreators,
  posts,
  comments,
  profiles,
  sessioncontents,
  likes,
  notifications
})

export default reducer
