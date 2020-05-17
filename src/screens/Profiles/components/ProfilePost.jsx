import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs'
import { useNavigation } from '@react-navigation/native'

import { getSessioncontentByContentId } from '../../../modules/sessioncontent/selector'

import ScrollUpContext from '../context'

import Post from '../../Feed/components/Post.jsx'
const ProfilePost = ({
  sessioncontent,
  post,
  currentContentcreator
}) => {
  const { navigate } = useNavigation()

  const context = useContext(ScrollUpContext)

  const handleClick = (contentcreator) => {
    if (contentcreator === currentContentcreator) {
      context.scrollUp()
    } else {
      navigate('Profiles', {
        screen: 'Profile',
        params: { contentcreator },
      })
    }
  }

  return (
    <Post 
      {...sessioncontent}
      postElement={post}
      headerClick={handleClick}
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
