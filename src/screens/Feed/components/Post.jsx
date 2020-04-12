import React from 'react'
import { connect } from 'react-redux'
import { toJS } from '../../../utils/immutableToJs'


import { 
  Card, 
  CardItem
} from 'native-base'

import PostHeader from './PostHeader.jsx'
import PostBody from './PostBody.jsx'
import PostFooter from './PostFooter.jsx'

import { getPostByPostId } from '../../../modules/post/selector'

const Post = ({
  id,
  element,
  updated_at
}) => {
  console.log(element)

  return (
    <Card>
      <CardItem header bordered>
        <PostHeader 
          {...element}
          time={updated_at}
         />
      </CardItem>
      <CardItem cardBody style={{margin: 0}}>
        <PostBody {...element} />
        {/* <PostFooter {...element} /> */}
      </CardItem>
    </Card>
  )
}

const mapStateToProps = (state, ownProps) => ({
  element: getPostByPostId(state, ownProps)
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Post))
