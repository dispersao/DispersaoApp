import React from 'react'
import { Ionicons } from "@expo/vector-icons"


import { Comments } from '../../../components/feedbacks/index.jsx'

const CommentsBox = ({
  comments,
  opened,
  onArrowPress
}) => {
  return (
    <>
    <Comments amount={comments} />
    <Ionicons.Button
      color='#999'
      backgroundColor={'rgba(255,255,255,50)'}
      size={22}
      onPress={onArrowPress}
      name={opened ? 'ios-arrow-up' : 'ios-arrow-down'}
    />
    </>
  )
}

export default CommentsBox
