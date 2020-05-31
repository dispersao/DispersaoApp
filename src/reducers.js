import { combineReducers } from 'redux'

import scripts from './modules/script/reducer'
import appuser from './modules/appuser/reducer'
import contentcreators from './modules/contentcreator/reducer'
import posts from './modules/post/reducer'
import comments from './modules/comment/reducer'
import profiles from './modules/profile/reducer'
import sessioncontents from './modules/sessioncontent/reducer'
import likes from './modules/likes/reducer'

const reducer = combineReducers({
  scripts,
  appuser,
  contentcreators,
  posts,
  comments,
  profiles,
  sessioncontents,
  likes
})

export default reducer
