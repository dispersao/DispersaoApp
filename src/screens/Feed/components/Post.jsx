import React, { useState } from 'react'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { 
  Card, 
  CardItem
} from 'native-base'

import PostHeader from './PostHeader.jsx'
import PostBody from './PostBody.jsx'
import PostFooter from './PostFooter.jsx'
import CommentList from './CommentList.jsx'

import { getPostByPostId } from '../../../modules/post/selector'
import { getCommentsByPostId } from '../../../modules/comment/selector'

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  cardBody: {
    paddingBottom: 20,
  }
})

const Post = (props) => {

  const [commentsOpened, setCommentsOpened] = useState(false)
  const { navigate } = useNavigation()

  const {
    element,
    updated_at,
    comments,
    currentProfile
  } = props
  
  const handleHeaderClick = (id) => {
    if( id === currentProfile) {
      console.log('should scroll up')
    } else {
      navigate('Profiles', {
        screen: 'Profile',
        params: { id },
      })
    }
    
  }

  return (
    <Card >
      <CardItem header style={styles.card}>
        {element && 
          <PostHeader 
            {...element}
            time={updated_at}
            onClick={handleHeaderClick}
          />
        }
      </CardItem>
      <CardItem 
        cardBody 
        style={StyleSheet.compose(styles.card, styles.cardBody)}>
        <PostBody {...element}  />
      </CardItem>
      <CardItem 
        footer={!commentsOpened} 
        bordered 
        style={styles.card}>
        <PostFooter 
          {...props}
          commentsOpened={commentsOpened}
          onCommentsToggle={val => setCommentsOpened(val)} />
      </CardItem>
      {commentsOpened && comments.length &&
        <CommentList 
          comments={comments}
        />
      }
    </Card>
  )
}

const mapStateToProps = (state, ownProps) => ({
  element: ownProps.postElement || getPostByPostId(state, ownProps),
  comments: getCommentsByPostId(state, ownProps)
})

export default connect(
  mapStateToProps,
  null
)(toJS(Post))
