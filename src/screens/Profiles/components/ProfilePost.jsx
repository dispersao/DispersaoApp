import React from 'react'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs'
import { useNavigation } from '@react-navigation/native'

import { getSessioncontentByContentId } from '../../../modules/sessioncontent/selector'

import Post from '../../Feed/components/Post.jsx'
const ProfilePost = ({
  sessioncontent,
  post,
  currentProfile
}) => {

  return (
    <Post 
      {...sessioncontent}
      postElement={post}
      currentProfile={currentProfile}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  sessioncontent: getSessioncontentByContentId(state, {...ownProps.post, type: 'post'})
})

export default connect(
  mapStateToProps,
  null
)(toJS(ProfilePost))
