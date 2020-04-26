import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs.jsx'

import {
  likeCreate,
  likeUpdate,
  likeDelete
} from '../../../modules/likes/actions'

import { getCommentsByPostId } from '../../../modules/comment/selector'
import { getLikesByLikeIds } from '../../../modules/likes/selector'

import { Left } from 'native-base'

import {
  Likes,
  Dislikes,
  Comments
} from '../../../components/feedbacks/index.jsx'


const PostFooter = ({
  id,
  processedLikes,
  comments,
  createLike,
  deleteLike,
  updateLike
}) => {
  const likeStr = 'like'
  const dislikeStr = 'dislike'

  const onClick = (type) => {
    if (!myLikeId && !myLikeStatus) {
      setMyLikeStatus(type)
      createLike(type === dislikeStr)
    } else if (type !== myLikeStatus) {
      setMyLikeStatus(type)
      updateLike(myLikeId, type === dislikeStr)
    } else {
      setMyLikeStatus(null)
      deleteLike(myLikeId)
    }
  }

  let likeId, likeStatus

  const [myLikeStatus, setMyLikeStatus] = useState()
  const [myLikeId, setMyLikeId] = useState()

  const likes = processedLikes.filter(l => !l.dislike)
  const dislikes = processedLikes.filter(l => l.dislike)

  const myLikes = likes.filter(l => l.appuser)
  const myDislikes = dislikes.filter(l => l.appuser)

  if (myLikes.length || myDislikes.length) {
    likeId = myLikes.length? myLikes[0].id : myDislikes[0].id
    likeStatus = myLikes.length? likeStr : dislikeStr
  }

  useEffect(()=> {
    setMyLikeStatus(likeStatus)
  },[likeStatus])

  useEffect(()=> {
    setMyLikeId(likeId)
  }, [likeId])

  return (
    <>
      <Left>
        <Likes 
          amount={likes.length}
          marked={myLikeStatus === likeStr}
          onClick={() => onClick(likeStr)} />
        <Dislikes 
          amount={dislikes.length}
          marked={myLikeStatus === dislikeStr}
          onClick={() => onClick(dislikeStr)} />
      </Left>
      {/* {comments && comments.length &&
        <Right>
          <Comments amount={comments.length} />
        </Right>
      } */}
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  comments: getCommentsByPostId(state, ownProps),
  processedLikes: getLikesByLikeIds(state, ownProps)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createLike: (dislike) => dispatch(likeCreate({
    dislike,
    sessioncontent: ownProps.id
  })),
  updateLike: (id, dislike) => dispatch(likeUpdate({id, dislike})),
  deleteLike: (id) => dispatch(likeDelete({id}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(PostFooter))
