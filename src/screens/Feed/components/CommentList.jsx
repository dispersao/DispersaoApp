import React from 'react'

import { 
  CardItem
} from 'native-base'

import Comment from './Comment.jsx'

const CommentList = ({
  comments
}) => {
  return(
    <>
      { comments.map((comment, index) => (
        <CardItem key={index} footer={index === comments.length - 1}>
          <Comment key={index}
            {...comment} />
        </CardItem>
      ))}
    </>
  )
}

export default CommentList
