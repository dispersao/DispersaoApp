import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { getLikesBySessioncontentId } from '../../../modules/likes/selector'

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
  myLike,
  likes,
  dislikes,
  comments
}) => {
 
  return (
    <>
      <Left>
        <LikesBox
          likes={likes}
          dislikes={dislikes}
          myLike={myLike && myLike.length && myLike[0]}
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
  myLike: getLikesBySessioncontentId(state, ownProps)
})

export default connect(
  mapStateToProps,
  null
)(toJS(PostFooter))
