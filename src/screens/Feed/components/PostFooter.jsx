import React from 'react'
import { StyleSheet } from 'react-native'

import { connect } from 'react-redux'

import { Left } from 'native-base'

import {
  Likes,
  Dislikes,
  Comments
} from '../../../components/feedbacks/index.jsx'


const PostFooter = ({
  post,
  likes, 
  dislikes,
  comments
}) => {
  return (
    <>
      <Left>
        <Likes 
          amount={likes} 
          onClick={() => onClick('likes')} />
        <Dislikes 
          amount={dislikes}
          onClick={() => onClick('dislikes')} />
      </Left>
      {comments && comments.length &&
        <Right>
          <Comments amount={comments.length} />
        </Right>
      }
    </>
  )
}

export default PostFooter
