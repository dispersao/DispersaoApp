import React, { useState } from 'react'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs'
import { StyleSheet, View } from 'react-native'

import { Card, CardItem } from 'native-base'

import PostHeader from './PostHeader.jsx'
import PostBody from './PostBody.jsx'
import PostFooter from './PostFooter.jsx'
import Comment from './Comment.jsx'

import { getPostByPostId } from '../../../modules/post/selector'
import { getCommentsByPostId } from '../../../modules/comment/selector'

const styles = StyleSheet.create({
  card: {
    padding: 16
  },
  cardBody: {
    paddingBottom: 20
  }
})

const Post = (props) => {
  const { id, element, updated_at, comments, headerClick, onLayout } = props

  const [elementY, setElementY] = useState(null)
  const [commentsY, setCommentsY] = useState({})

  const onLayoutEvent = (event) => {
    const y = event.nativeEvent.layout.y
    setElementY(y)
    if (onLayout) {
      onLayout(id, y)
      if (Object.keys(commentsY).length) {
        Object.entries(commentsY).forEach(([key, value]) => {
          onLayout(key, value + y)
        })
      }
    }
  }

  const onCommentLayout = (id, y) => {
    if(onLayout) {
      if(!Number.isNaN(elementY)) {
        onLayout(id, elementY + y)
      } else {
        setCommentsY({
          ...commentsY,
          [id]: y
        })
      }
    }
  }

  return (
    <Card onLayout={onLayoutEvent}>
      <CardItem header style={styles.card}>
        {element && (
          <PostHeader {...element} time={updated_at} onClick={headerClick} />
        )}
      </CardItem>
      <CardItem cardBody style={styles.card}>
        <PostBody {...element} />
      </CardItem>
      <CardItem footer={Boolean(comments.length)} bordered style={styles.card}>
        <PostFooter {...props} />
      </CardItem>
      {comments.map((comment, index) => {
        return (<Comment 
          key={index}
          footer={index === comments.length - 1}
          onLayout={onCommentLayout} 
          {...comment} />)
      })}
    </Card>
  )
}

const mapStateToProps = (state, ownProps) => ({
  element: ownProps.postElement || getPostByPostId(state, ownProps),
  comments: getCommentsByPostId(state, ownProps)
})

export default connect(mapStateToProps, null)(toJS(Post))
