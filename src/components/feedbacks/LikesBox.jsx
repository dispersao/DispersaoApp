import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { View, StyleSheet } from 'react-native'

import {
  likeCreate,
  likeUpdate,
  likeDelete,
} from "../../modules/likes/actions"

import { Likes, Dislikes } from "./index.jsx"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
})

const LikesBox = ({
  likes,
  dislikes,
  myLike,
  createLike,
  updateLike,
  deleteLike,
}) => {
  const likeStr = "like"
  const dislikeStr = "dislike"

  let [myLikeStatus, setMyLikeStatus] = useState("loaded")

  let myLikeType
  if(myLike) {
    myLikeType = myLike.dislike ? dislikeStr : likeStr
  }

  const onClick = (type) => {
    if (myLikeStatus !== "loading") {
      setMyLikeStatus("loading")
      if (!myLike) {
        createLike(type === dislikeStr)
      } else if (type !== myLikeType) {
        updateLike(myLike.id, type === dislikeStr)
      } else {
        deleteLike(myLike.id)
      }
    }
  }

  useEffect(() => {
    setMyLikeStatus("loaded")
  }, [JSON.stringify(myLike)])

  return (
    <>
      {myLikeStatus === "loaded" && (
        <View style={styles.container}>
          <Likes
            amount={likes}
            marked={myLikeType === likeStr}
            onClick={() => onClick(likeStr)}
          />
          <Dislikes
            amount={dislikes}
            marked={myLikeType === dislikeStr}
            onClick={() => onClick(dislikeStr)}
          />
        </View>
      )}
    </>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  createLike: (dislike) =>
    dispatch(
      likeCreate({
        dislike,
        sessioncontent: ownProps.sessioncontentId,
      })
    ),
  updateLike: (id, dislike) => dispatch(likeUpdate({ id, dislike })),
  deleteLike: (id) => dispatch(likeDelete({ id })),
})

export default connect(
  null, 
  mapDispatchToProps)
(LikesBox)
