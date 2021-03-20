import React from 'react'
import IconFeedback from './IconFeedback.jsx'

const Comments = (props) => {
  return (
    <IconFeedback 
      icon='ios-chatbubbles'
      isButton={false}
      {...props}
   />
  )
}
export default Comments
