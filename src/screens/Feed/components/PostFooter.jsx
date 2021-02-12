import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { getLikesByLikeIds } from '../../../modules/likes/selector'

import LikesBox from '../../../components/feedbacks/LikesBox.jsx'
import { Comments } from '../../../components/feedbacks/index.jsx'

import { 
  Left,
  Right
} from 'native-base'

const styles = StyleSheet.create({
  commentsBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})


const PostFooter = ({
  id,
  processedLikes,
  comments
}) => {
  const likes = processedLikes.filter(l => !l.dislike)
  const dislikes = processedLikes.filter(l => l.dislike)

  const myLikes = processedLikes.filter(l => l.appuser)
  const myLike = myLikes.length && myLikes[0]
  
  return (
    <>
      <Left>
        <LikesBox
          likes={likes.length}
          dislikes={dislikes.length}
          myLike={myLike}
          sessioncontentId={id}/>
      </Left>
      {comments && comments.length > 0 &&
        <Right style={styles.commentsBox}>
          <Comments amount={comments.length} />
        </Right>
      }
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  processedLikes: getLikesByLikeIds(state, ownProps)
})

export default connect(
  mapStateToProps,
  null
)(toJS(PostFooter))
